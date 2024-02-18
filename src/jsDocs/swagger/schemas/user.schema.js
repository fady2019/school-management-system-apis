/**
 * @openapi
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *         username:
 *           type: string
 *           minLength: 3
 *         password:
 *           type: string
 *           minLength: 6
 *
 *     CreateUserInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *           required:
 *             - name
 *             - username
 *             - password
 *
 *     SuperAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *
 *     CreateSuperAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *
 *     SchoolAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *           properties:
 *             managedSchoolId:
 *               type: string
 *
 *     CreateSchoolAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *         - $ref: '#/components/schemas/SchoolAdminInput'
 *
 *     StudentInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *           properties:
 *             level:
 *               type: number
 *               minimum: 1
 *               maximum: 18
 *             classroomId:
 *               type: string
 *
 *     CreateStudentInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *         - $ref: '#/components/schemas/StudentInput'
 *         - type: object
 *           required:
 *             - level
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         userType:
 *           type: string
 *         creatorId:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     SuperAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             userType:
 *               type: string
 *               enum: [SuperAdmin]
 *
 *     SchoolAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             userType:
 *               type: string
 *               enum: [SchoolAdmin]
 *             managedSchoolId:
 *               type: string
 *               nullable: true
 *
 *     Student:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             userType:
 *               type: string
 *               enum: [Student]
 *             level:
 *               type: number
 *             schoolId:
 *               type: string
 *             classroomId:
 *               type: string
 *               nullable: true
 */
