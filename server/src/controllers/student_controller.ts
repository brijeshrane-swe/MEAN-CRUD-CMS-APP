import { NextFunction, Request, Response } from "express";
import { IStudent } from "../types/student_interface.js";
import StudentService from "../services/student_service.js";
import AppError from "../utils/AppError.js";

/**
 * StudentController class handles incoming HTTP requests related to student management.
 * It orchestrates calls to the StudentService and sends back appropriate HTTP responses.
 */
class StudentController {
    /**
     * Handles GET /api/students requests.
     * Retrieves all students.
     */
    static async getAllStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const students: IStudent[] = await StudentService.getAllStudents();
            res.status(200).json({
                status: 'success',
                results: students.length,
                data: {
                    students
                }
            });
        } catch (error) {
            // Pass error to the centralized error handling middleware
            next(error);
        }
    }

    /**
     * Handles GET /api/students/:id requests.
     * Retrieves a single student by ID.
     */
    static async getStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studentId = parseInt(req.params.id, 10); // Parse ID from URL parameters
            if (isNaN(studentId)) {
                throw new AppError('Invalid student ID provided', 400);
            }

            const student = await StudentService.getStudentById(studentId);
            // StudentService.getStudentById already throws AppError if not found

            res.status(200).json({
                status: 'success',
                data: {
                    student
                }
            });
        } catch (error) {
            next(error); // Pass error to the centralized error handling middleware
        }
    }

    /**
     * Handles POST /api/students requests.
     * Creates a new student.
     */
    static async createStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // req.body will contain { s_name, s_course, course_fee }
            const newStudent = await StudentService.createStudent(req.body);

            res.status(201).json({ // 201 Created status code
                status: 'success',
                message: 'Student created successfully',
                data: {
                    student: newStudent
                }
            });
        } catch (error) {
            next(error); // Pass error to the centralized error handling middleware
        }
    }

    /**
     * Handles PATCH /api/students/:id requests.
     * Updates an existing student.
     */
    static async updateStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studentId = parseInt(req.params.id, 10);
            if (isNaN(studentId)) {
                throw new AppError('Invalid student ID provided', 400);
            }

            // req.body can contain partial update data { s_name?, s_course?, course_fee? }
            const updated = await StudentService.updateStudent(studentId, req.body);

            if (!updated) {
                // This case might be caught by AppError from Service, but a fallback is good
                throw new AppError(`Failed to update student with ID ${studentId}`, 500);
            }

            res.status(200).json({
                status: 'success',
                message: `Student with ID ${studentId} updated successfully`
            });
        } catch (error) {
            next(error); // Pass error to the centralized error handling middleware
        }
    }

    /**
     * Handles DELETE /api/students/:id requests.
     * Deletes a student by ID.
     */
    static async deleteStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studentId = parseInt(req.params.id, 10);
            if (isNaN(studentId)) {
                throw new AppError('Invalid student ID provided', 400);
            }

            const deleted = await StudentService.deleteStudent(studentId);

            if (!deleted) {
                // This case might be caught by AppError from Service, but a fallback is good
                throw new AppError(`Failed to delete student with ID ${studentId}`, 500);
            }

            res.status(204).json({ // 204 No Content status code for successful deletion
                status: 'success',
                data: null // No content returned for 204
            });
        } catch (error) {
            next(error); // Pass error to the centralized error handling middleware
        }
    }
}

export default StudentController;