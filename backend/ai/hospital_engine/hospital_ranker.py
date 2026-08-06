from hospital_database import HOSPITALS


def recommend_hospital(patient_resources):

    best_hospital = None
    best_score = -1

    for hospital in HOSPITALS:

        # -----------------------------
        # Resource Match
        # -----------------------------

        matched = []

        for resource in patient_resources:
            if resource in hospital["resources"]:
                matched.append(resource)

        resource_score = (
            len(matched) / len(patient_resources)
        ) * 100

        # -----------------------------
        # ETA Score
        # -----------------------------

        eta_score = max(0, 100 - hospital["eta"] * 5)

        # -----------------------------
        # Waiting Score
        # -----------------------------

        waiting_score = max(0, 100 - hospital["waiting_time"] * 2)

        # -----------------------------
        # Final Score
        # -----------------------------

        final_score = (
            resource_score * 0.70 +
            eta_score * 0.20 +
            waiting_score * 0.10
        )

        if final_score > best_score:

            best_score = final_score

            best_hospital = {

                "hospital": hospital["name"],

                "score": round(final_score, 2),

                "matched_resources": matched,

                "missing_resources": [
                    r for r in patient_resources
                    if r not in matched
                ],

                "eta": hospital["eta"],

                "waiting_time": hospital["waiting_time"]
            }

    return best_hospital