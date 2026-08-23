import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function RfidNfcScanner() {
    const navigate = useNavigate();

    const [scanning, setScanning] = useState(false);
    const [patient, setPatient] = useState(null);

    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState("");
    const [frozenFrame, setFrozenFrame] = useState(null);

    const [digitalIdMode, setDigitalIdMode] = useState(false);
    const [digitalId, setDigitalId] = useState("");
    const [digitalIdScanning, setDigitalIdScanning] = useState(false);
    const [digitalIdError, setDigitalIdError] = useState("");

    const videoRef = useRef(null);
    const streamRef = useRef(null);


    /*
     * Attach camera stream
     */
    useEffect(() => {
        if (
            cameraActive &&
            videoRef.current &&
            streamRef.current
        ) {
            const video = videoRef.current;

            video.srcObject = streamRef.current;

            video.play().catch((error) => {
                console.error(
                    "Video playback failed:",
                    error
                );
            });
        }
    }, [cameraActive]);


    /*
     * Start camera
     */
    const startCamera = async () => {
        try {
            setCameraError("");
            setFrozenFrame(null);

            if (!navigator.mediaDevices?.getUserMedia) {
                setCameraError(
                    "Camera access is not supported by this browser."
                );
                return;
            }

            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());

                streamRef.current = null;
            }

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: {
                            ideal: "environment",
                        },
                        width: {
                            ideal: 1280,
                        },
                        height: {
                            ideal: 720,
                        },
                    },
                    audio: false,
                });

            streamRef.current = stream;

            setCameraActive(true);

        } catch (error) {
            console.error(
                "Camera access failed:",
                error
            );

            setCameraActive(false);

            if (error.name === "NotAllowedError") {
                setCameraError(
                    "Camera permission was denied. Please allow camera access in your browser settings."
                );
            } else if (
                error.name === "NotFoundError"
            ) {
                setCameraError(
                    "No camera was found on this device."
                );
            } else {
                setCameraError(
                    "Camera could not be started."
                );
            }
        }
    };


    /*
     * Stop camera
     */
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current
                .getTracks()
                .forEach((track) => track.stop());

            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setCameraActive(false);
    };


    /*
     * Capture and freeze current camera frame
     */
    const freezeCameraFrame = () => {
        const video = videoRef.current;

        if (!video) {
            stopCamera();
            return;
        }

        if (
            video.readyState < 2 ||
            !video.videoWidth ||
            !video.videoHeight
        ) {
            stopCamera();
            return;
        }

        try {
            const canvas =
                document.createElement("canvas");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context =
                canvas.getContext("2d");

            if (!context) {
                stopCamera();
                return;
            }

            context.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const image =
                canvas.toDataURL(
                    "image/jpeg",
                    0.9
                );

            setFrozenFrame(image);

        } catch (error) {
            console.error(
                "Could not capture camera frame:",
                error
            );
        }

        stopCamera();
    };


    /*
     * Cleanup camera when leaving page
     */
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);


    /*
     * RFID / NFC confirmation beep
     */
    const playBeep = async (audioContext) => {
        try {
            if (
                audioContext.state ===
                "suspended"
            ) {
                await audioContext.resume();
            }

            const now =
                audioContext.currentTime;


            // First beep
            const oscillator1 =
                audioContext.createOscillator();

            const gain1 =
                audioContext.createGain();

            oscillator1.type = "square";

            oscillator1.frequency.setValueAtTime(
                880,
                now
            );

            gain1.gain.setValueAtTime(
                0.0001,
                now
            );

            gain1.gain.exponentialRampToValueAtTime(
                0.3,
                now + 0.01
            );

            gain1.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.15
            );

            oscillator1.connect(gain1);
            gain1.connect(
                audioContext.destination
            );

            oscillator1.start(now);
            oscillator1.stop(
                now + 0.15
            );


            // Second beep
            const oscillator2 =
                audioContext.createOscillator();

            const gain2 =
                audioContext.createGain();

            oscillator2.type = "square";

            oscillator2.frequency.setValueAtTime(
                1200,
                now + 0.18
            );

            gain2.gain.setValueAtTime(
                0.0001,
                now + 0.18
            );

            gain2.gain.exponentialRampToValueAtTime(
                0.3,
                now + 0.19
            );

            gain2.gain.exponentialRampToValueAtTime(
                0.0001,
                now + 0.33
            );

            oscillator2.connect(gain2);
            gain2.connect(
                audioContext.destination
            );

            oscillator2.start(
                now + 0.18
            );

            oscillator2.stop(
                now + 0.33
            );

        } catch (error) {
            console.error(
                "Beep failed:",
                error
            );
        }
    };


    /*
     * RFID / NFC scan
     */
    const handleScan = async () => {
        try {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) {
                console.error(
                    "Web Audio API unavailable."
                );
                return;
            }

            const audioContext =
                new AudioContext();

            await audioContext.resume();

            setScanning(true);
            setPatient(null);

            setTimeout(async () => {

                /*
                 * Freeze physical card frame
                 */
                freezeCameraFrame();

                /*
                 * Reader confirmation beep
                 */
                await playBeep(
                    audioContext
                );

                setScanning(false);

                setPatient({
                    patientId:
                        "LR-PATIENT-001",

                    name:
                        "Saiyam Kumar",

                    cardType:
                        "RFID / NFC",

                    status:
                        "Patient identity verified",
                });

                setTimeout(() => {
                    audioContext.close();
                }, 600);

            }, 1800);

        } catch (error) {
            console.error(
                "RFID scan failed:",
                error
            );

            setScanning(false);
        }
    };


    /*
     * Open Digital Patient ID mode
     */
    const openDigitalIdMode = () => {
        stopCamera();

        setDigitalIdMode(true);
        setDigitalId("");
        setDigitalIdError("");
        setPatient(null);
        setFrozenFrame(null);
    };


    /*
     * Return to RFID / NFC mode
     */
    const returnToRfidMode = () => {
        setDigitalIdMode(false);
        setDigitalId("");
        setDigitalIdError("");
        setDigitalIdScanning(false);
        setPatient(null);
        setFrozenFrame(null);
    };


    /*
     * Verify Digital Patient ID
     *
     * Demo behaviour:
     * LR-PATIENT-001 identifies Saiyam Kumar.
     */
    const handleDigitalIdVerification = () => {
        setDigitalIdError("");

        const normalizedId =
            digitalId.trim().toUpperCase();

        if (!normalizedId) {
            setDigitalIdError(
                "Please enter a LifeRoute Patient ID."
            );
            return;
        }

        setDigitalIdScanning(true);
        setPatient(null);

        setTimeout(() => {

            if (
                normalizedId ===
                "LR-PATIENT-001"
            ) {
                setDigitalIdScanning(false);

                setPatient({
                    patientId:
                        "LR-PATIENT-001",

                    name:
                        "Saiyam Kumar",

                    cardType:
                        "Digital Patient ID",

                    status:
                        "Patient identity verified",
                });

            } else {
                setDigitalIdScanning(false);

                setDigitalIdError(
                    "Patient ID was not found. Please check the ID and try again."
                );
            }

        }, 1200);
    };


    /*
     * Continue to existing LifeRoute assessment
     */
    const startAssessment = () => {
        stopCamera();

        navigate(
            "/patient/assessment"
        );
    };


    /*
     * Scan another card
     */
    const scanAnotherCard = () => {
        setPatient(null);
        setFrozenFrame(null);

        if (!digitalIdMode) {
            startCamera();
        }
    };


    return (
        <div className="min-h-screen bg-[#090b10] text-white">


            {/* HEADER */}

            <header className="border-b border-white/10 bg-[#0c0f14]">

                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">

                            <div className="w-3 h-3 rounded-full bg-orange-500" />

                        </div>

                        <div>

                            <div className="text-lg font-bold">
                                LifeRoute
                            </div>

                            <div className="text-[10px] tracking-[0.25em] text-gray-500 uppercase">
                                Patient Portal
                            </div>

                        </div>

                    </div>


                    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-green-500/20 bg-green-500/5">

                        <span className="w-2 h-2 rounded-full bg-green-400" />

                        <span className="text-xs text-green-400">
                            System Online
                        </span>

                    </div>

                </div>

            </header>


            {/* MAIN */}

            <main className="max-w-6xl mx-auto px-6 py-12">


                {/* TITLE */}

                <div className="max-w-3xl mb-10">

                    <div className="flex items-center gap-2 mb-4">

                        <span className="w-2 h-2 rounded-full bg-orange-500" />

                        <span className="text-xs font-semibold tracking-[0.2em] text-orange-400 uppercase">
                            Emergency Identification
                        </span>

                    </div>


                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        Patient Identification
                    </h1>


                    <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                        Quickly identify the patient before beginning
                        the LifeRoute emergency assessment.
                    </p>

                </div>


                {/* MAIN GRID */}

                <div className="grid lg:grid-cols-[1.35fr_0.75fr] gap-6">


                    {/* MAIN IDENTIFICATION PANEL */}

                    <div className="rounded-2xl border border-white/10 bg-[#11141a] overflow-hidden">


                        {/* PANEL HEADER */}

                        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">

                            <div>

                                <p className="text-xs text-gray-500 tracking-[0.18em] uppercase">
                                    Identification Method
                                </p>


                                <h2 className="text-lg font-semibold mt-1">

                                    {digitalIdMode
                                        ? "Digital Patient ID"
                                        : "RFID / NFC"}

                                </h2>

                            </div>


                            <div className="px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-xs text-orange-400">

                                {digitalIdMode
                                    ? "Digital"
                                    : "Secure"}

                            </div>

                        </div>


                        <div className="p-8">


                            {/* DIGITAL PATIENT ID */}

                            {digitalIdMode ? (

                                <div className="max-w-xl mx-auto py-6">

                                    {!patient && !digitalIdScanning && (

                                        <>

                                            <div className="mx-auto w-20 h-20 rounded-2xl border border-orange-500/20 bg-orange-500/5 flex items-center justify-center">

                                                <div className="w-8 h-8 rounded-lg border-2 border-orange-400/60 flex items-center justify-center">

                                                    <span className="text-xs font-bold text-orange-400">
                                                        ID
                                                    </span>

                                                </div>

                                            </div>


                                            <div className="text-center mt-6">

                                                <h3 className="text-2xl font-semibold">
                                                    Continue with Digital Patient ID
                                                </h3>


                                                <p className="text-gray-400 mt-3 leading-relaxed">
                                                    Enter the patient's registered
                                                    LifeRoute identifier to continue.
                                                </p>

                                            </div>


                                            <div className="mt-8">

                                                <label
                                                    htmlFor="patient-id"
                                                    className="block text-xs text-gray-500 uppercase tracking-[0.15em] mb-2"
                                                >
                                                    LifeRoute Patient ID
                                                </label>


                                                <input
                                                    id="patient-id"
                                                    type="text"
                                                    value={digitalId}
                                                    onChange={(event) =>
                                                        setDigitalId(
                                                            event.target.value
                                                        )
                                                    }
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key ===
                                                            "Enter"
                                                        ) {
                                                            handleDigitalIdVerification();
                                                        }
                                                    }}
                                                    placeholder="e.g. LR-PATIENT-001"
                                                    className="w-full rounded-xl border border-white/10 bg-[#0c0f14] px-4 py-4 text-white placeholder:text-gray-600 outline-none focus:border-orange-500/40 transition"
                                                />


                                                {digitalIdError && (

                                                    <p className="mt-3 text-sm text-red-400">
                                                        {digitalIdError}
                                                    </p>

                                                )}


                                                <button
                                                    onClick={
                                                        handleDigitalIdVerification
                                                    }
                                                    className="mt-5 w-full rounded-xl bg-orange-500 py-4 font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/10"
                                                >
                                                    Verify Patient ID
                                                </button>


                                                <button
                                                    onClick={
                                                        returnToRfidMode
                                                    }
                                                    className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                                                >
                                                    Use RFID / NFC Instead
                                                </button>

                                            </div>

                                        </>

                                    )}


                                    {/* DIGITAL ID VERIFICATION */}

                                    {digitalIdScanning && (

                                        <div className="text-center py-12">

                                            <div className="mx-auto w-12 h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />


                                            <h3 className="text-xl font-semibold mt-6">
                                                Verifying Patient ID
                                            </h3>


                                            <p className="text-gray-500 mt-2">
                                                Retrieving patient identity...
                                            </p>

                                        </div>

                                    )}

                                </div>

                            ) : (

                                <>


                                    {/* CAMERA */}

                                    <div className="mb-8">

                                        <div className="flex items-center justify-between mb-3">

                                            <div>

                                                <p className="text-xs tracking-[0.18em] text-gray-500 uppercase">
                                                    Visual Card Preview
                                                </p>


                                                <p className="text-sm text-gray-400 mt-1">
                                                    Position your physical card near the reader.
                                                </p>

                                            </div>


                                            {cameraActive && (

                                                <div className="flex items-center gap-2">

                                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                                                    <span className="text-xs text-green-400">
                                                        Camera Active
                                                    </span>

                                                </div>

                                            )}


                                            {frozenFrame &&
                                                !cameraActive && (

                                                    <div className="flex items-center gap-2">

                                                        <span className="w-2 h-2 rounded-full bg-green-400" />

                                                        <span className="text-xs text-green-400">
                                                            Card Captured
                                                        </span>

                                                    </div>

                                                )}

                                        </div>


                                        {/* CAMERA WINDOW */}

                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#05070a]">


                                            {/* LIVE CAMERA */}

                                            {cameraActive && (

                                                <>

                                                    <video
                                                        ref={videoRef}
                                                        autoPlay
                                                        playsInline
                                                        muted
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />


                                                    <div className="absolute inset-0 pointer-events-none bg-black/10" />


                                                    <div className="absolute inset-0 pointer-events-none">

                                                        <div className="absolute inset-8 border border-white/20 rounded-xl" />


                                                        <div className="absolute top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur text-xs text-white">
                                                            Position card inside frame
                                                        </div>


                                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 border-2 border-orange-400/70 rounded-xl" />

                                                    </div>

                                                </>

                                            )}


                                            {/* FROZEN FRAME */}

                                            {!cameraActive &&
                                                frozenFrame && (

                                                    <div className="absolute inset-0">

                                                        <img
                                                            src={
                                                                frozenFrame
                                                            }
                                                            alt="Captured identification card"
                                                            className="w-full h-full object-cover"
                                                        />


                                                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />


                                                        <div className="absolute inset-8 border-2 border-green-400/60 rounded-xl" />


                                                        <div className="absolute top-5 left-1/2 -translate-x-1/2">

                                                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur border border-green-400/20">

                                                                <span className="w-2 h-2 rounded-full bg-green-400" />

                                                                <span className="text-xs text-green-400 font-medium">
                                                                    CARD CAPTURED
                                                                </span>

                                                            </div>

                                                        </div>


                                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">

                                                            <div className="px-4 py-2 rounded-full bg-black/75 backdrop-blur border border-white/10">

                                                                <span className="text-xs text-white/70">
                                                                    Identification frame captured
                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )}


                                            {/* NO CAMERA */}

                                            {!cameraActive &&
                                                !frozenFrame && (

                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                                                        <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center mb-4">

                                                            <span className="text-gray-500 text-xs">
                                                                CAMERA
                                                            </span>

                                                        </div>


                                                        <p className="text-sm text-gray-400">
                                                            Camera preview disabled
                                                        </p>


                                                        <button
                                                            onClick={
                                                                startCamera
                                                            }
                                                            className="mt-4 px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition"
                                                        >
                                                            Enable Camera
                                                        </button>

                                                    </div>

                                                )}

                                        </div>


                                        {cameraError && (

                                            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">

                                                <p className="text-xs text-red-400">
                                                    {cameraError}
                                                </p>

                                            </div>

                                        )}

                                    </div>


                                    {/* SCAN READY */}

                                    {!patient &&
                                        !scanning && (

                                            <div className="text-center border-t border-white/10 pt-8">

                                                <div className="relative mx-auto w-56 h-40 mb-8">

                                                    <div className="absolute inset-0 rounded-3xl bg-orange-500/5 blur-2xl" />


                                                    <div className="absolute inset-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#20242b] to-[#0d0f13] shadow-2xl">

                                                        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2">

                                                            <span className="w-2 h-2 rounded-full bg-orange-500" />

                                                            <span className="text-[9px] tracking-[0.2em] text-gray-500 uppercase">
                                                                NFC / RFID
                                                            </span>

                                                        </div>


                                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 rounded-xl border border-orange-500/20 bg-orange-500/5 flex items-center justify-center">

                                                            <div className="flex items-end gap-1">

                                                                <div className="w-1 h-3 border-r border-orange-400/50" />

                                                                <div className="w-2 h-5 border-r border-orange-400/60 rounded-r-full" />

                                                                <div className="w-3 h-7 border-r border-orange-400/70 rounded-r-full" />

                                                            </div>

                                                        </div>


                                                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">

                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                                                            <span className="text-[9px] text-gray-500">
                                                                READY
                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>


                                                <h3 className="text-2xl font-semibold">
                                                    Ready to identify patient
                                                </h3>


                                                <p className="text-gray-400 mt-3 max-w-md mx-auto">
                                                    Bring the patient's RFID/NFC
                                                    card near the reader to
                                                    securely identify them.
                                                </p>


                                                <button
                                                    onClick={
                                                        handleScan
                                                    }
                                                    className="mt-8 w-full rounded-xl bg-orange-500 py-4 font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/10"
                                                >
                                                    Scan RFID / NFC Card
                                                </button>


                                                {/* DIGITAL ID ALTERNATIVE */}

                                                <div className="flex items-center gap-3 my-6">

                                                    <div className="h-px flex-1 bg-white/10" />

                                                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.15em]">
                                                        or
                                                    </span>

                                                    <div className="h-px flex-1 bg-white/10" />

                                                </div>


                                                <button
                                                    onClick={
                                                        openDigitalIdMode
                                                    }
                                                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-3.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.05] transition"
                                                >
                                                    Continue with Digital Patient ID
                                                </button>


                                                <p className="text-xs text-gray-600 mt-5">
                                                    Secure patient identification
                                                </p>

                                            </div>

                                        )}


                                    {/* SCANNING */}

                                    {scanning && (

                                        <div className="text-center border-t border-white/10 pt-8">

                                            <div className="relative mx-auto w-56 h-40 mb-8">

                                                <div className="absolute inset-0 rounded-3xl border border-orange-500/30 animate-pulse" />


                                                <div className="absolute inset-5 rounded-2xl bg-[#171a20] border border-orange-500/40 flex flex-col items-center justify-center">

                                                    <div className="flex items-end gap-1">

                                                        <div className="w-1 h-3 border-r border-orange-400" />

                                                        <div className="w-2 h-5 border-r border-orange-400 rounded-r-full" />

                                                        <div className="w-3 h-7 border-r border-orange-400 rounded-r-full" />

                                                    </div>


                                                    <div className="w-3 h-3 rounded-full bg-orange-500 mt-3 animate-pulse" />

                                                </div>

                                            </div>


                                            <div className="flex items-center justify-center gap-2">

                                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

                                                <span className="text-sm font-semibold text-orange-400 tracking-wider">
                                                    READING CARD
                                                </span>

                                            </div>


                                            <h3 className="text-2xl font-semibold mt-3">
                                                Identifying patient...
                                            </h3>


                                            <p className="text-gray-400 mt-3">
                                                Verifying patient identity
                                            </p>

                                        </div>

                                    )}

                                </>

                            )}


                            {/* PATIENT IDENTIFIED */}

                            {patient && (

                                <div className="border-t border-white/10 pt-8">


                                    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 mb-6">

                                        <div className="flex items-start gap-4">

                                            <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">

                                                <span className="text-green-400 text-xl">
                                                    ✓
                                                </span>

                                            </div>


                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <span className="text-xs tracking-[0.15em] text-green-400 font-semibold">

                                                        {patient.cardType ===
                                                        "Digital Patient ID"
                                                            ? "DIGITAL ID VERIFIED"
                                                            : "RFID / NFC DETECTED"}

                                                    </span>


                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />

                                                </div>


                                                <h3 className="text-2xl font-bold mt-1">
                                                    Patient Identified
                                                </h3>


                                                <p className="text-gray-400 mt-1">
                                                    {patient.status}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* PATIENT PROFILE */}

                                    <div className="rounded-xl border border-white/10 bg-[#0c0f14] overflow-hidden">

                                        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">

                                            <div>

                                                <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">
                                                    Verified Identity
                                                </p>


                                                <p className="text-lg font-semibold mt-1">
                                                    Patient Profile
                                                </p>

                                            </div>


                                            <div className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                                                Verified
                                            </div>

                                        </div>


                                        <div className="p-5">

                                            <div className="flex items-center gap-4 pb-5 border-b border-white/10">

                                                <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">

                                                    <span className="text-orange-400 text-lg font-bold">
                                                        SK
                                                    </span>

                                                </div>


                                                <div>

                                                    <p className="text-xl font-semibold">
                                                        Saiyam Kumar
                                                    </p>


                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Registered LifeRoute Patient
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="grid sm:grid-cols-2 gap-4 mt-5">

                                                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">

                                                    <p className="text-xs text-gray-500">
                                                        Patient ID
                                                    </p>


                                                    <p className="font-semibold mt-1">
                                                        {patient.patientId}
                                                    </p>

                                                </div>


                                                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">

                                                    <p className="text-xs text-gray-500">
                                                        Identification
                                                    </p>


                                                    <p className="font-semibold text-orange-400 mt-1">
                                                        {patient.cardType}
                                                    </p>

                                                </div>


                                                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 sm:col-span-2">

                                                    <p className="text-xs text-gray-500">
                                                        Identity Status
                                                    </p>


                                                    <div className="flex items-center gap-2 mt-1">

                                                        <span className="w-2 h-2 rounded-full bg-green-400" />


                                                        <p className="font-semibold text-green-400">
                                                            Identity Verified
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ASSESSMENT */}

                                    <button
                                        onClick={
                                            startAssessment
                                        }
                                        className="mt-6 w-full rounded-xl bg-orange-500 py-4 font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/10"
                                    >
                                        Continue to Emergency Assessment
                                    </button>


                                    {/* RESCAN / OTHER METHOD */}

                                    <button
                                        onClick={() => {
                                            setPatient(null);
                                            setFrozenFrame(null);

                                            if (
                                                patient.cardType ===
                                                "Digital Patient ID"
                                            ) {
                                                setDigitalId("");
                                                setDigitalIdMode(
                                                    true
                                                );
                                            } else {
                                                startCamera();
                                            }
                                        }}
                                        className="mt-3 w-full rounded-xl border border-white/10 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
                                    >
                                        Use Another Identification Method
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* RIGHT INFORMATION PANEL */}

                    <div className="space-y-6">


                        {/* IDENTIFICATION */}

                        <div className="rounded-2xl border border-white/10 bg-[#11141a] p-6">

                            <p className="text-xs tracking-[0.18em] text-orange-400 uppercase">
                                Patient Identification
                            </p>


                            <h2 className="text-xl font-semibold mt-2">
                                Fast and flexible access
                            </h2>


                            <p className="text-sm text-gray-400 leading-relaxed mt-3">
                                Patients can be identified using their
                                RFID/NFC card or their registered
                                LifeRoute digital identity.
                            </p>

                        </div>


                        {/* FLOW */}

                        <div className="rounded-2xl border border-white/10 bg-[#11141a] p-6">

                            <p className="text-xs tracking-[0.18em] text-gray-500 uppercase">
                                Identification Flow
                            </p>


                            <div className="mt-6 space-y-5">

                                {[
                                    [
                                        "01",
                                        "Identify",
                                        "Present RFID/NFC card or digital ID",
                                    ],
                                    [
                                        "02",
                                        "Verify",
                                        "Confirm registered patient identity",
                                    ],
                                    [
                                        "03",
                                        "Secure",
                                        "Retrieve patient information",
                                    ],
                                    [
                                        "04",
                                        "Assess",
                                        "Begin emergency assessment",
                                    ],
                                    [
                                        "05",
                                        "Route",
                                        "LifeRoute recommends suitable care",
                                    ],
                                ].map(
                                    ([
                                        number,
                                        title,
                                        description,
                                    ]) => (

                                        <div
                                            key={number}
                                            className="flex gap-4"
                                        >

                                            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs text-orange-400 flex-shrink-0">
                                                {number}
                                            </div>


                                            <div>

                                                <p className="font-medium">
                                                    {title}
                                                </p>


                                                <p className="text-xs text-gray-500 mt-1">
                                                    {description}
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* PRIVACY */}

                        <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-5">

                            <div className="flex gap-3">

                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />


                                <p className="text-xs text-gray-500 leading-relaxed">
                                    The physical identification card does
                                    not need to contain sensitive medical
                                    information. Patient information remains
                                    within the LifeRoute system.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default RfidNfcScanner;