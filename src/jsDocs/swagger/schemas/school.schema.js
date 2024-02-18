/**
 * @openapi
 * components:
 *   schemas:
 *     SchoolInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 * 
 *     CreateSchoolInput:
 *       allOf:
 *         - $ref: '#/components/schemas/SchoolInput'
 *         - type: object
 *           required:
 *             - name
 *
 *     School:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         creatorId:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
