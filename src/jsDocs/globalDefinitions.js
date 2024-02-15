/**
 * @typedef {import("express").Express} ExpressApp
 *
 * @typedef {import("express").Request} ExpressRequest
 * @typedef {import("express").Response} ExpressResponse
 * @typedef {import("express").NextFunction} ExpressNext
 * @typedef {(req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => any} ExpressMiddleware
 *
 *
 *
 * @typedef { "SuperAdmin" | "SchoolAdmin" | "Student" } TUserType
 * @typedef {{ userKey: string, userType: TUserType  }} TContextUser
 *
 * @typedef {{
 *   req: ExpressRequest,
 *   res: ExpressResponse,
 *   user: TContextUser
 * }} TContext
 *
 *
 *
 * @typedef { import("mongoose").ObjectId } TObjectId
 *
 * @typedef {{
 *   createdAt?: string | Date,
 *   updatedAt?: string | Date,
 * }} TTimestamps
 *
 * @typedef {TTimestamps & {
 *   name: string,
 *   username: string,
 *   password: string,
 *   creatorId?: TObjectId | null,
 * }} TUserSchema
 *
 * @typedef { TUserSchema } TSuperAdminSchema
 *
 * @typedef {import("mongoose").Model<TSuperAdminSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, TSuperAdminSchema>, any>} TSuperAdminModel
 *
 * @typedef {TUserSchema & { managedSchoolId: TObjectId | null }} TSchoolAdminSchema
 *
 * @typedef {import("mongoose").Model<TSchoolAdminSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, TSchoolAdminSchema>, any>} TSchoolAdminModel
 *
 * @typedef {TUserSchema & {
 *   level: number,
 *   schoolId: TObjectId,
 *   classroomId: TObjectId
 * }} TStudentSchema
 *
 * @typedef {import("mongoose").Model<TStudentSchema, {}, {}, {}, import("mongoose").Document<unknown, {}, TStudentSchema>, any>} TStudentModel
 *
 *
 * @typedef {TTimestamps & {
 *   name: string,
 *   creatorId?: TObjectId | null
 * }} TSchoolSchema
 *
 * @typedef {TTimestamps & {
 *   name: string,
 *   schoolId: TObjectId,
 *   creatorId: TObjectId
 * }} TClassroomSchema
 */
