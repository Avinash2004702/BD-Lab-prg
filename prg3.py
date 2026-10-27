from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect("students.db")
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

create_table()


@app.route('/students', methods=['POST'])
def add_student():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({
            "message": "Name and Email are required"
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO students(name, email) VALUES(?, ?)",
        (name, email)
  )
    conn.commit()
    conn.close()

    return jsonify({
        "message": "Student Added Successfully"
    }), 201


@app.route('/students', methods=['GET'])
def get_students():

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM students")

    students = cursor.fetchall()

    conn.close()

    student_list = []

    for student in students:
        student_list.append({
            "id": student["id"],
            "name": student["name"],
            "email": student["email"]
        })

    return jsonify(student_list)


if __name__ == '__main__':
    app.run(debug=True)

