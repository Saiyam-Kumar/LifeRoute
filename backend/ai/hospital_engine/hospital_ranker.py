def calculate_resource_match(patient_resources, hospital):
    matched = []

    for resource in patient_resources:

        if resource == "ICU":
            if hospital.get("available_icu", 0) > 0:
                matched.append(resource)

        elif resource == "Ventilator":
            if hospital.get("ventilators", 0) > 0:
                matched.append(resource)

        elif resource in hospital.get("specialists", []):
            matched.append(resource)

        elif resource in hospital.get("resources", []):
            matched.append(resource)

    score = 0
    if patient_resources:
        score = (len(matched) / len(patient_resources)) * 100

    return score, matched


def calculate_eta_score(hospital):
    eta = hospital.get("eta", 999)
    return max(0, 100 - eta * 5)


def calculate_open_score(hospital):
    return 100 if hospital.get("is_open", False) else 0


def recommend_hospital(patient_resources, hospitals):

    best_hospital = None
    best_score = -1

    for hospital in hospitals:

        resource_score, matched = calculate_resource_match(
            patient_resources,
            hospital
        )

        eta_score = calculate_eta_score(hospital)

        open_score = calculate_open_score(hospital)

        final_score = (
            resource_score * 0.80 +
            eta_score * 0.15 +
            open_score * 0.05
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
    "eta": hospital.get("eta", None),
    "distance_km": hospital.get("distance_km", None)
}

    return best_hospital