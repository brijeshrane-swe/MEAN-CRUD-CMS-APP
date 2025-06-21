import {ICreateStudent, IStudent, IUpdateStudent} from "../types/student_interface.js";
import StudentModel from "../models/student_model.js";
import AppError from "../utils/AppError.js";

/**
 * StudentService class encapsulates the business logic related to student management.
 * It interacts with the StudentModel for data persistence and applies business rules.
 */
class StudentService {
    /**
     * Retrieves all students.
     * @returns A promise that resolves to an array of IStudent objects.
     */
    static async getAllStudents(): Promise<IStudent[]> {
        return await StudentModel.findAll();
    }

    /**
     * Retrieves a single student by ID.
     * @param id The ID of the student.
     * @returns A promise that resolves to an IStudent object or undefined.
     * @throws AppError if the student is not found.
     */
    static async getStudentById(id: number): Promise<IStudent> {
        const student = await StudentModel.findById(id);
        if (!student) {
            throw new AppError(`Student with ID ${id} not found.`, 404);
        }
        return student;
    }

    /**
     * Creates a new student.
     * @param studentData The data for the new student.
     * @returns A promise that resolves to the newly created IStudent object with its ID.
     * @throws AppError if required fields are missing or data is invalid.
     */
    static async createStudent(studentData: ICreateStudent): Promise<IStudent> {
        // Basic validation example
        if (!studentData.s_name || !studentData.s_course || studentData.course_fee == undefined) {
            throw new AppError("Missing required fields: s_name, s_course, or course_fee.", 400);
        }

        const newStudentId = await StudentModel.create(studentData);

        // Optionally, fetch the complete new student record to return it
        const newStudent = await StudentModel.findById(newStudentId);

        if (!newStudent) {
            throw new AppError("Failed to create student. Please try again.", 500);
        }

        return newStudent;
    }

    /**
     * Updates an existing student.
     * @param id The ID of the student to update.
     * @param studentData The data to update.
     * @returns A promise that resolves to true if the update was successful.
     * @throws AppError if the student is not found or no update data is provided.
     */
    static async updateStudent(id: number, studentData: IUpdateStudent): Promise<boolean> {
        // Ensure at least one field is provided for update
        if (Object.keys(studentData).length === 0) {
            throw new AppError("No fields provided for update.", 400);
        }

        // Check if a student exists before attempting to update
        const student = await StudentModel.findById(id);
        if (!student) {
            throw new AppError(`Student with ID ${id} not found.`, 404);
        }

        const updateResult: boolean = await StudentModel.update(id, studentData);
        if (!updateResult) {
            throw new AppError(`Failed to update student with ID ${id}. No changes made.`, 400);
        }

        return updateResult;
    }

    /**
     * Deletes a student by ID.
     * @param id The ID of the student to delete.
     * @returns A promise that resolves to true if the deletion was successful.
     * @throws AppError if the student is not found.
     */
    static async deleteStudent(id: number): Promise<boolean> {
        // Check if a student exists before attempting to delete
        const studentExists = await StudentModel.findById(id);
        if (!studentExists) {
            throw new AppError(`Student with ID ${id} not found`, 404);
        }

        const deleted = await StudentModel.delete(id);
        if (!deleted) {
            throw new AppError(`Failed to delete student with ID ${id}`, 500);
        }
        return deleted;
    }
}

export default StudentService;