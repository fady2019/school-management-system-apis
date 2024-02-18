/**
 * @openapi
 * components:
 *   responses:
 *     UnauthorizedError:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseError'
 * 
 *     ForbiddenError:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseError'
 * 
 *     NotFoundError:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseError'
 * 
 *     ConflictError:
 *       description: Conflict
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseError'
 * 
 *     UnprocessableEntityError:
 *       description: Unprocessable Entity
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseError'
 * 
 *     ServerError:
 *       description: Server Issue
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResponseError'
 */
