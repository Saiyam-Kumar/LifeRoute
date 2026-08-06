from hospital_ranker import recommend_hospital

patient_resources = [
    "ICU",
    "CT Scan",
    "Ventilator",
    "Emergency Physician"
]

result = recommend_hospital(patient_resources)

print("\n===== BEST HOSPITAL =====\n")

print("Hospital:")
print(result["hospital"])

print("\nScore:")
print(result["score"])

print("\nMatched Resources:")
for item in result["matched_resources"]:
    print("-", item)

print("\nMissing Resources:")
for item in result["missing_resources"]:
    print("-", item)

print("\nETA:")
print(result["eta"], "minutes")

print("\nWaiting Time:")
print(result["waiting_time"], "minutes")