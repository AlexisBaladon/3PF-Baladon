import { Course } from '../interfaces/course'
import Student from '../interfaces/student'
import User from '../interfaces/user'
import { Enrollment } from '../models/enrollment'

//avoids typescript conversion errors
export function jsonParser<T>(objects: Array<any>): T[] {
    return JSON.parse(JSON.stringify(objects)).default
}

export function createStudent(student: Student): Student {
    return new Student(
        student.id,
        student.name,
        student.surname,
        student.phone,
        student.direction,
        student.email,
        student.admissionDate,
        student.averageGrade,
        student.career,
        student.pictureUrl,
    )
}

export function createStudents(students: Student[]): Student[] {
    return students.map(s => createStudent(s))
}

export function createCourse(course: Course): Course {
    return new Course(
        course.id,
        course.name,
        course.description,
        course.credits,
        course.averageGrade,
        course.icon,
        course.category,
    )
}

export function createCourses(courses: Course[]): Course[] {
    return courses.map(c => createCourse(c));
}

export function createUser(user: User): User {
    return new User(
        user.id,
        user.email,
        user.name,
        user.surname,
        user.password,
        user.profile,
        user.direction,
        user.phone,
    )
}

export function createUsers(users: User[]): User[] {
    return users.map(u => createUser(u));
}

export function createEnrollment(enrollment: Enrollment): Enrollment {
    return new Enrollment(
        enrollment.id,
        enrollment.studentId,
        enrollment.courseId,
        enrollment.grade,
        enrollment.enrollmentDate,
        enrollment.finishDate,
        enrollment.enrollerId,
    )
}

export function createEnrollments(enrollments: Enrollment[]): Enrollment[] {
    return enrollments.map(e => createEnrollment(e));
}