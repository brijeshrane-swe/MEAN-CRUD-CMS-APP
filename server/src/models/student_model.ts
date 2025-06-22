import pool from "../db/db_connection";
import { IStudent, ICreateStudent, IUpdateStudent } from "../types/student_interface";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * StudentModel class handles all direct database interactions for the 'student' table.
 * It provides static methods for CRUD operations.
 */
class StudentModel {
    /**
     * Retrieves all student records from the database.
     * @returns A promise that resolves to an array of IStudent objects.
     */
    static async findAll(): Promise<IStudent[]> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM student');
        return rows as IStudent[];
    }

    /**
     * Finds a single student record by its ID.
     * @param id The ID of the student to find.
     * @returns A promise that resolves to an IStudent object or undefined if not found.
     */
    static async findById(id: number): Promise<IStudent | undefined> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM student WHERE s_id = ?', [id]);
        return (rows.length > 0 ? rows[0] : undefined) as IStudent | undefined;
    }

    /**
     * Creates a new student record in the database.
     * @param studentData An object containing the student's name, course, and fee.
     * @returns A promise that resolves to the ID of the newly created student.
     */
    static async create(studentData: ICreateStudent): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO student (s_name, s_course, course_fee) VALUES (?, ?, ?)',
            [studentData.s_name, studentData.s_course, studentData.course_fee]
        );
        return result.insertId;
    }

    /**
     * Updates an existing student record by its ID.
     * @param id The ID of the student to update.
     * @param studentData An object containing the fields to update.
     * @returns A promise that resolves to true if the update was successful, false otherwise.
     */
    static async update(id: number, studentData: IUpdateStudent): Promise<boolean> {
        const fields: string[] = [];
        const values: any[] = [];

        // Dynamically build the UPDATE query based on provided fields
        if (studentData.s_name !== undefined) {
            fields.push('s_name = ?');
            values.push(studentData.s_name);
        }
        if (studentData.s_course !== undefined) {
            fields.push('s_course = ?');
            values.push(studentData.s_course);
        }
        if (studentData.course_fee !== undefined) {
            fields.push('course_fee = ?');
            values.push(studentData.course_fee);
        }

        if (fields.length === 0) {
            return false; // No fields to update
        }

        values.push(id); // Add the ID to the end of values for the WHERE clause
        const query = `UPDATE student SET ${fields.join(', ')} WHERE s_id = ?`;

        const [result] = await pool.query<ResultSetHeader>(query, values);
        return result.affectedRows > 0;
    }

    /**
     * Deletes a student record by its ID.
     * @param id The ID of the student to delete.
     * @returns A promise that resolves to true if the deletion was successful, false otherwise.
     */
    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM student WHERE s_id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default StudentModel;