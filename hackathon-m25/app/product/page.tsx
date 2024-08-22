"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import {data} from "../../database/product"

export interface Products {
    id: number,
    productName: string,
    price: number,
    image: string,
    quantity: number
}

export default function page() {
    const [product, setProduct] = useState<Products[]>([]);
    const router = useRouter();
    const [newProduct, setNewProduct] = useState<Products>({
        id: product.length + 1,
        productName: '',
        price: 0,
        image: '',
        quantity: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: name === 'price' || name === 'quantity' ? parseInt(value) : value,
        });
    };

    const handleAddProduct = async () => {
        const newProducts = {
            id: Math.ceil(Math.random() * 1000),
            productName: newProduct.productName,
            price: newProduct.price,
            image: newProduct.image,
            quantity: newProduct.quantity
        }
        await axios.post("http://localhost:3000/api/product", newProducts)
            .then((response) => {
                setProduct(response.data.data);
                // setNewProduct({ id: 0, productName: '', price: 0, image: '', quantity: 0 }); e api thoi la duoc roi lau vl
            })
            .catch((err) => {
                console.error("Failed to add product:", err);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:3000/api/product")
            .then((respon) => {
                console.log(respon);
                setProduct(respon.data.data)

            })
            .catch((err) => {

            })
    }, [])

    const handleDetail = (idProduct: number) => {
        router.push(`/product/${idProduct}`)
    }

    return (
        <div className='flex gap-32'>
            <table className='border border-black text-center w-[800px]'>
                <thead className='border border-black' >
                    <tr>
                        <th className='border border-black'>STT</th>
                        <th className='border border-black'>Tên sản phẩm</th>
                        <th className='border border-black'>Hình ảnh</th>
                        <th className='border border-black'>Giá</th>
                        <th className='border border-black'>Số lượng</th>
                        <th className='border border-black'>Chức năng</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        product.map((item: any) => {
                            return (
                                <tr key={item.id}>
                                    <td className='border border-black'>{item.id}</td>
                                    <td className='border border-black'>{item.productName}</td>
                                    <td className='border border-black'><img className='w-40' src={item.image} alt="" onClick={() => handleDetail(item.id)} /></td>
                                    <td className='border border-black'>{item.price}</td>
                                    <td className='border border-black'>{item.quantity}</td>
                                    <td className='border border-black' >
                                        <button className='border rounded w-[80px]'>Sửa</button>
                                        <button className='border bg-red-500 w-[80px] rounded text-white'>Xóa</button>
                                    </td>
                                </tr>

                            )
                        })
                    }

                </tbody>
            </table>
            <div className='border border-black p-5 rounded h-96'>
                <h2 className='font-bold text-center'>Thêm mới sản phẩm</h2>
                <p>Tên</p>
                <input className='border border-black rounded' type="text" placeholder='tên' onChange={handleInputChange} name="productName"
                    value={newProduct.productName}
                />
                <p>Hình ảnh</p>
                <input className='border border-black rounded ' type="text" placeholder='hình ảnh' onChange={handleInputChange} name="image"
                    value={newProduct.image} />
                <p>Giá</p>
                <input className='border border-black rounded ' type="text" placeholder='giá' onChange={handleInputChange} name="price"
                    value={newProduct.price} />
                <p>Số lượng</p>
                <input className='border border-black rounded ' type="text" placeholder='số lượng' onChange={handleInputChange} name="quantity"
                    value={newProduct.quantity} />
                <br />
                <br />
                <button className='border border-black w-60  rounded bg-blue-400 text-white' onClick={handleAddProduct}>Thêm</button>
            </div>
        </div>
    )
}
