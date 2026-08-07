import { predictPatient } from "../services/predictionService";

export async function runPrediction(
    patientData,
    setPrediction,
    setLoading
) {
    try {
        setLoading(true);

        const result = await predictPatient(patientData);

        setPrediction(result);

        return result;

    } catch (error) {

        console.error(error);

        throw error;

    } finally {

        setLoading(false);

    }
}