import { type NextRequest, NextResponse } from "next/server";
import { AuthUser, requireAuth } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// 上传文件
export const POST = requireAuth(
  async (request: NextRequest, _context: any, _user: AuthUser) => {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "File is required" },
          { status: 400 }
        );
      }

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      // 生成唯一文件名
      const ext = path.extname(file.name);
      const filename = `${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, filename);

      // 这里可以添加实际的文件上传逻辑
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        message: "File uploaded successfully",
        path: `/uploads/${filename}`
      });
    } catch (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
);
