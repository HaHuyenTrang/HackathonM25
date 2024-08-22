import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export let product=[
    {
        id:1,
        productName:"Cam",
        price:12,
        image:"https://suckhoedoisong.qltns.mediacdn.vn/Images/thanhloan/2016/06/05/tac-dung-cua-qua-cam-2.jpg",
        quantity:12
    },
    {
        id:2,
        productName:"Táo",
        price:15,
        image:"https://hoaquafuji.com/storage/app/media/anh-sua/cropped-images/tao-do-2-6-16-794-709-1623469683.jpg",
        quantity:20
    },
    {
        id:3,
        productName:"Nho",
        price:25,
        image:"https://cafebiz.cafebizcdn.vn/2019/12/15/photo-1-1576375028682389363747.jpeg",
        quantity:8
    },
    {
        id:4,
        productName:"Chuối",
        price:10,
        image:"https://vov.vn/sites/default/files/styles/large/public/2023-12/2_qua_chuoi.jpg",
        quantity:30
    }
   
]
export async function GET(){
    return NextResponse.json({
        message:"lấy danh sách sản phẩm thành công!",
        data:product
    })
}

export async function DELETE(){
    return NextResponse.json({
        message:"xóa sản phẩm thành công!",
        data:product
    })
}

export async function POST(request: NextRequest){
    const productRequest = await request.json();
    product.push(productRequest)
    return NextResponse.json({
        message: "Thêm sp thành công",
        data: product
    })
}
    
