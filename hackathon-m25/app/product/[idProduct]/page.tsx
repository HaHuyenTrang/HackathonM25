"use client";
import React, { useEffect, useState } from 'react';
import { Products } from '../page';
import axios from 'axios';
import { product } from '@/app/api/product/route';

interface Props {
    params: {
        idProduct: string;
    };
}

export default function ProductDetailPage({ params }: Props) {
    const [productDetail, setProductDetail] = useState<Products | null>(null);

    useEffect(() => {
        const productDetail = product.find(
            (item) => item.id === parseInt(params.idProduct)
        );
        setProductDetail(productDetail || null);
    }, [params.idProduct]);

    if (!productDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Thông tin chi tiết</h2>
            <p>Tên sản phẩm: {productDetail.productName}</p>
            <p>Hình ảnh: <img src={productDetail.image} alt={productDetail.productName} width="200" /></p>
            <p>Giá: ${productDetail.price}</p>
            <p>Số lượng: {productDetail.quantity}</p>
        </div>
    );
}
