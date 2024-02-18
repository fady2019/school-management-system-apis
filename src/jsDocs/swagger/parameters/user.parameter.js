/**
 * @openapi
 * components:
 *   parameters:
 *     UserIdParam:
 *       name: userId
 *       in: path
 *       schema:
 *         type: string
 *       required: true
 *
 *     SuperAdminIdParam:
 *       allOf:
 *         - $ref: '#/components/parameters/UserIdParam'
 *       description: The id of the target Super Admin
 *
 *     SchoolAdminIdParam:
 *       allOf:
 *         - $ref: '#/components/parameters/UserIdParam'
 *       description: The id of the target School Admin
 * 
 *     StudentIdParam:
 *       allOf:
 *         - $ref: '#/components/parameters/UserIdParam'
 *       description: The id of the target Student
 */
