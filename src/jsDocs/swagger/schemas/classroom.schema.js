/**
 * @openapi
 * components:
 *   schemas:
 *     ClassroomInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *
 *     CreateClassroomInput:
 *       allOf:
 *         - $ref: '#/components/schemas/ClassroomInput'
 *         - type: object
 *           required:
 *             - name
 *
 *     Classroom:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         schoolId:
 *           type: string
 *         creatorId:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
