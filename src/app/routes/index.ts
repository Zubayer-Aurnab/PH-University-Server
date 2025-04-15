import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { StudentRoutes } from "../modules/student/student.route";

const router = Router()


const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/students",
        route: StudentRoutes
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route))


// router.use('/users', UserRoutes) //application  routes
// router.use('/students', StudentRoutes) //application  routes

export default router