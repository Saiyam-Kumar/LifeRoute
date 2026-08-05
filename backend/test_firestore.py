from app.database.firebase import db

print("Connecting to Firestore...\n")

docs = db.collection("hospitals").stream()

for doc in docs:
    print(doc.id)
    print(doc.to_dict())