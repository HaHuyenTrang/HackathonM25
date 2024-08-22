import { NextResponse } from "next/server";
import { product } from "../route";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '', 10);

    const productDetail = product.find((item) => item.id === id);

    if (!productDetail) {
        return NextResponse.json({ message: "Không tìm thấy sản phẩm", success: false });
    }

    return NextResponse.json({
        message: "Lấy chi tiết sản phẩm thành công!",
        data: productDetail,
        success: true,
    });
}