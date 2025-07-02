import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";

export async function registerUser(email: string, password: string) {
    if (!email.match(/@/) || password.length < 6) {
        throw new Error("Invalid email or password");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, password: hashed },
    });

    return { id: user.id, email: user.email };
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const id = user.id
    const role = user.role

    const token = signToken({ id, role });
    return { data: { token, id, role } };
}

export async function loginSupllier(email: string, password: string) {
    const role = "supplier"

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const isSupplier = await prisma.user.findMany({ where: { role } });
    if (!isSupplier) throw new Error("Not supplier account");

    const id = user.id

    const token = signToken({ id: user.id, role: user.role });
    return { data: { token, id, role } };
}

export async function resetPassword(email: string, password: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    const isOld = await bcrypt.compare(newPassword, user.password);
    if (isOld) throw new Error("Cannot use old password");

    const hashed = await bcrypt.hash(newPassword, 10);

    const updatePassword = await prisma.user.update({
        where: { email },
        data: { password: hashed },
    });

    return { id: updatePassword.id, email: updatePassword.email };
}