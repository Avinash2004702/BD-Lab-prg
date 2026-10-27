
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('students.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER
        )
    ''')

    conn.commit()
    conn.close()


# POST - Create a new student
@app.route('/students', methods=['POST'])
def create_student():

    data = request.get_json()

    conn = sqlite3.connect('students.db')
    cursor = conn.cursor()

    cursor.execute(
        'INSERT INTO students (name, email, age) VALUES (?, ?, ?)',
        (data['name'], data['email'], data.get('age', 0))
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Student created"}), 201


@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):

    data = request.get_json()
    conn = sqlite3.connect('students.db')
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE students SET name=?, email=?, age=? WHERE id=?',
        (data['name'], data['email'], data.get('age', 0), student_id)
    )
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Student not found"}), 404

    conn.close()

    return jsonify({"message": "Student updated"})


@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):

    conn = sqlite3.connect('students.db')
    cursor = conn.cursor()

    cursor.execute(
        'DELETE FROM students WHERE id=?',
        (student_id,)
    )

    conn.commit()
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Student not found"}), 404

    conn.close()
    return jsonify({"message": "Student deleted"})


if __name__ == '__main__':
    init_db()
    app.run(debug=True)