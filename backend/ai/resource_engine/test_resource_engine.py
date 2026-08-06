from resource_predictor import predict_resources

patient = {
    "chief_complain": "head trauma",
    "ktas": 2,
    "spo2": 86,
    "sbp": 80,
    "hr": 135,
    "rr": 28
}

result = predict_resources(patient)

print("\n===== RESOURCE PREDICTION =====\n")

print("Category:")
print(result["category"])

print("\nResources:")
for resource in result["resources"]:
    print("-", resource)

print("\nReasons:")
for reason in result["reasons"]:
    print("-", reason)