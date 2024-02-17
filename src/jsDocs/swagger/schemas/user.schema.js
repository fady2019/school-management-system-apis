/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *
 *     CreateSuperAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *
 *     UpdateSuperAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UpdateUserInput'
 *
 *     CreateSchoolAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *         - type: object
 *           properties:
 *             managedSchoolId:
 *               type: string
 * 
 *     UpdateSchoolAdminInput:
 *       allOf:
 *         - $ref: '#/components/schemas/UpdateUserInput'
 *         - type: object
 *           properties:
 *             managedSchoolId:
 *               type: string
 *
 *     CreateStudentInput:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateUserInput'
 *         - type: object
 *           required:
 *             - level
 *           properties:
 *             level:
 *               type: number
 *             classroomId:
 *               type: string
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
 *
 *     SchoolAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             managedSchoolId:
 *               type: string
 *               nullable: true
 *
 *     Student:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             level:
 *               type: number
 *               min: 1
 *               max: 18
 *             schoolId:
 *               type: string
 *               nullable: true
 *             classroomId:
 *               type: string
 *               nullable: true
 */
