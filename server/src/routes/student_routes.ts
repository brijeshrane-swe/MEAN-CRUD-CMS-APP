import { Router } from "express";
import StudentController from "../controllers/student_controller";

/**
 * Creates an Express Router for student-related API endpoints.
 * This router defines the URL paths and maps them to corresponding controller methods.
 */

const router: Router = Router();

// Route to get all students
// GET /api/students
router.get('/', StudentController.getAllStudents);

// Route to get a single student by ID
// GET /api/students/:id
router.get('/:id', StudentController.getStudentById);

// Route to create a new student
// POST /api/students
router.post('/', StudentController.createStudent);

// Route to update an existing student by ID (partial update)
// PATCH /api/students/:id
router.patch('/:id', StudentController.updateStudent);

// Route to delete a student by ID
// DELETE /api/students/:id
router.delete('/:id', StudentController.deleteStudent);

export default router;