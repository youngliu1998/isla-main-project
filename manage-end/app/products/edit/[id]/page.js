'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '../../data-controller.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar"; // Assuming you have this
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Assuming
import { ArrowLeft, Save, CalendarIcon, UploadCloud, XCircle } from 'lucide-react';
import Image from 'next/image';
import { format, isValid, parseISO } from 'date-fns'; // For date handling
import { UseProductEditDetail } from '@/hook/use-products.js'


const MAX_IMAGES = 5;

export default function ProductEditPage({params}) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;
    const productId = id;
    const { data: products, isLoading, error } = UseProductEditDetail(productId);
    const product  = products?.product;

    // 初始化空的表單狀態
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        stock: '',
        status: 'active',
        description: '',
        images: [],
        sale_price: '',
        sale_start_date: null,
        sale_end_date: null,
        colors: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]); // 與 formData.images 保持一致，用於顯示
    const [isFormInitialized, setIsFormInitialized] = useState(false);
    const IMAGE_BASE_URL = 'https://isla-image.chris142852145.workers.dev/'

    useEffect(() => {
        console.log('product:', product); // DB

        if (product && !isFormInitialized) {
            const imageObjectsFromDb = product.images || [];

            // 產生圖片URL
            const showImagesWithFullUrl = imageObjectsFromDb
                .map(imgObj => {
                    const originImageName = imgObj?.image_url;
                    if (typeof originImageName === 'string' && originImageName.trim() !== '') {
                        // 檢查是否有 cloudFlare https
                        if (originImageName.startsWith('https')) {
                            return originImageName;
                        }
                        return `${IMAGE_BASE_URL}${originImageName}`;
                    }
                    console.warn('圖片 image_url 無效:', imgObj);
                    return null;
                })
                .filter(Boolean); // 移除任何 null 或 undefined 的結果

            const newFormData = {
                name: product.name || '',
                category: product.category_name || product.category || '',
                brand: product.brand_name || product.brand || '',
                price: product.base_price?.toString() || product.price?.toString() || '',
                // stock: product.stock_quantity?.toString() || product.stock?.toString() || '',
                status: product.status || 'active',
                description: product.description || '',
                images: showImagesWithFullUrl,
                sale_price: product.sale_price?.toString() || '',
                sale_start_date: product.sale_start_date ? parseISO(product.sale_start_date) : null,
                sale_end_date: product.sale_end_date ? parseISO(product.sale_end_date) : null,
                colors: Array.isArray(product.colors) ? product.colors : [],
            };

            setFormData(newFormData);
            setImagePreviews(showImagesWithFullUrl);
            setIsFormInitialized(true);

            console.log('Form state after initialization:', newFormData);
            console.log('Image previews initialized with:', showImagesWithFullUrl);

        } else if (!product && product && !isLoading && !error && !isFormInitialized) {
            console.warn('Data loaded from hook, but product.product details are missing.');
        }
    }, [product, isLoading, error, isFormInitialized]);


    // 處理表單輸入變更
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (value) => {
        setFormData(prev => ({ ...prev, status: value }));
    };

    const handleDateChange = (name, date) => {
        setFormData(prev => ({ ...prev, [name]: date }));
    };

    const handleColorChange = (index, field, value) => {
        const updatedColors = [...formData.colors];
        if (field === 'stock_quantity') {
            updatedColors[index][field] = parseInt(value, 10) || 0;
        } else {
            updatedColors[index][field] = value;
        }
        setFormData(prev => ({ ...prev, colors: updatedColors }));
    };

    const handleAddColor = () => {
        setFormData(prev => ({
            ...prev,
            colors: [...prev.colors, { color_name: '', color_code: '#000000', stock_quantity: 0 }],
        }));
    };

    const handleRemoveColor = (index) => {
        const updatedColors = [...formData.colors];
        updatedColors.splice(index, 1);
        setFormData(prev => ({ ...prev, colors: updatedColors }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const currentImageCount = imagePreviews.length; // 使用 imagePreviews 的長度來判斷

        if (files.length + currentImageCount > MAX_IMAGES) {
            alert(`最多只能上傳 ${MAX_IMAGES} 張圖片。您目前有 ${currentImageCount} 張，還能選擇 ${MAX_IMAGES - currentImageCount} 張。`);
            e.target.value = null;
            return;
        }

        Promise.all(
            files.map(file =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result); // Data URL
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })
            )
        ).then(newDataUrls => {
            // 將新的 Data URL 同時更新到 formData.images 和 imagePreviews
            const combinedImages = [...formData.images, ...newDataUrls].slice(0, MAX_IMAGES);
            setFormData(prev => ({ ...prev, images: combinedImages }));
            setImagePreviews(combinedImages); // 保持 imagePreviews 與 formData.images 同步（都存可顯示 URL）
        }).catch(error => {
            console.error("讀取檔案出錯:", error);
            alert("讀取圖片檔案時發生錯誤。");
        });
        e.target.value = null;
    };

    const removeImage = (indexToRemove) => {
        const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);
        setFormData(prev => ({ ...prev, images: updatedImages }));
        setImagePreviews(updatedImages); // 保持同步
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product?.product) {
            alert("產品資料尚未完整載入，無法儲存。");
            return;
        }

        // ... (日期轉換邏輯保持不變) ...
        const saleStartDateString = formData.sale_start_date && isValid(formData.sale_start_date) ? format(formData.sale_start_date, 'yyyy-MM-dd') : null;
        const saleEndDateString = formData.sale_end_date && isValid(formData.sale_end_date) ? format(formData.sale_end_date, 'yyyy-MM-dd') : null;

        // 現在 formData.images 包含的是：
        // 1. 原有圖片的「完整前綴 URL」
        // 2. 新上傳圖片的「Data URL」
        // **重要**: 你的 updateProduct 函數需要能夠處理這些。
        //   - 對於前綴 URL，它需要去掉 IMAGE_BASE_URL 得到原始檔名後再存儲。
        //   - 對於 Data URL，它需要上傳圖片，得到新檔名後再存儲。
        const imagesForSubmission = formData.images.map(imageUrl => {
            if (imageUrl.startsWith('data:')) {
                // 這是新圖片的 Data URL，直接傳遞，讓後端處理上傳和轉換
                return imageUrl;
            } else if (imageUrl.startsWith(IMAGE_BASE_URL)) {
                // 這是原有圖片的完整 URL，去掉前綴得到原始檔名/相對路徑
                return imageUrl.substring(IMAGE_BASE_URL.length);
            }
            // 如果有其他非預期格式的 URL，也直接傳遞，但後端應有相應處理
            console.warn("提交的圖片中有未知格式的 URL:", imageUrl);
            return imageUrl;
        });


        const updatedData = {
            ...formData, // name, category, brand, description, colors 等
            id: product.product.id,
            price: parseFloat(formData.price) || 0,
            // stock: parseInt(formData.stock, 10) || 0, // 確保 general stock 的處理
            sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
            sale_start_date: saleStartDateString,
            sale_end_date: saleEndDateString,
            images: imagesForSubmission, // <--- 傳遞處理後的圖片數據 (檔名或 Data URL)
        };

        console.log("準備提交的數據 (updatedData):", updatedData);

        const success = await updateProduct(updatedData);
        if (success) {
            alert('商品更新成功！');
            router.push('/products');
        } else {
            alert('商品更新失敗。');
        }
    };

    // 載入狀態
    if (isLoading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4">載入中...</p>
            </div>
        );
    }

    // 錯誤狀態
    if (error) {
        return (
            <div className="container mx-auto p-8 text-center text-red-500">
                <h2 className="text-xl font-bold mb-4">載入錯誤</h2>
                <p>{error}</p>
                <Button onClick={() => router.back()} className="mt-4">
                    返回
                </Button>
            </div>
        );
    }

    // 商品不存在
    if (!product && !isLoading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h2 className="text-xl font-bold mb-4">商品不存在</h2>
                <p>找不到 ID 為 {productId} 的商品。</p>
                <Button onClick={() => router.back()} className="mt-4">
                    返回列表
                </Button>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">
                            編輯商品：{formData.name || '載入中...'}
                        </CardTitle>
                        <Button variant="outline" size="sm" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> 返回列表
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info Section */}
                        <section>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">基本資訊</h3>
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="name">商品名稱</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1"
                                        placeholder="請輸入商品名稱"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="category">分類</Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="mt-1"
                                            placeholder="請輸入商品分類"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="brand">品牌</Label>
                                        <Input
                                            id="brand"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            required
                                            className="mt-1"
                                            placeholder="請輸入品牌"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="price">價格 (NT$)</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="mt-1"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="status">狀態</Label>
                                    <Select name="status" value={formData.status} onValueChange={handleStatusChange}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">上架中 (Active)</SelectItem>
                                            <SelectItem value="inactive">已下架 (Inactive)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="description">商品描述</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="mt-1"
                                        placeholder="請輸入商品描述"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Color Management Section */}
                        <section>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">顏色管理</h3>
                            <div className="space-y-4">
                                {formData.colors.map((color, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        <div>
                                            <Label>顏色名稱</Label>
                                            <Input
                                                value={color.color_name}
                                                onChange={(e) => handleColorChange(index, 'color_name', e.target.value)}
                                                placeholder="如：標準色、紅色..."
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label>顏色代碼</Label>
                                            <Input
                                                type="color"
                                                value={color.color_code || '#000000'}
                                                onChange={(e) => handleColorChange(index, 'color_code', e.target.value)}
                                                className="mt-1 h-10 w-16 p-0"
                                            />
                                        </div>
                                        <div>
                                            <Label>庫存數量</Label>
                                            <Input
                                                type="number"
                                                value={color.stock_quantity}
                                                onChange={(e) => handleColorChange(index, 'stock_quantity', e.target.value)}
                                                min="0"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => handleRemoveColor(index)}
                                                className="mt-1"
                                            >
                                                移除
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={handleAddColor}>
                                    新增顏色
                                </Button>
                            </div>
                        </section>

                        {/* Sale Price Section */}
                        <section>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">特價管理</h3>
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="sale_price">特價價格 (NT$, 選填)</Label>
                                    <Input
                                        id="sale_price"
                                        name="sale_price"
                                        type="number"
                                        value={formData.sale_price}
                                        onChange={handleChange}
                                        min="0"
                                        placeholder="留空表示無特價"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="sale_start_date">特價開始日期</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {formData.sale_start_date ? format(formData.sale_start_date, "PPP") : <span>選擇日期</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={formData.sale_start_date}
                                                    onSelect={(date) => handleDateChange('sale_start_date', date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div>
                                        <Label htmlFor="sale_end_date">特價結束日期</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className="w-full justify-start text-left font-normal mt-1">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {formData.sale_end_date ? format(formData.sale_end_date, "PPP") : <span>選擇日期</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={formData.sale_end_date}
                                                    onSelect={(date) => handleDateChange('sale_end_date', date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Image Upload Section */}
                        <section>
                            <h3 className="text-lg font-semibold mb-4 border-b pb-2">商品圖片 (最多 {MAX_IMAGES} 張)</h3>
                            <div className="space-y-4">
                                <div className="p-4 border-2 border-dashed rounded-md hover:border-blue-500 transition-colors">
                                    <Label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                                        <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-600">點擊此處或拖曳圖片到此區域上傳</span>
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            disabled={imagePreviews.length >= MAX_IMAGES}
                                        />
                                    </Label>
                                </div>
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                                        {imagePreviews.map((previewSrc, index) => (
                                            <div key={index} className="relative group border rounded-md overflow-hidden aspect-square">
                                                <Image
                                                    src={previewSrc}
                                                    alt={`商品圖片 ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6 opacity-75 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {imagePreviews.length >= MAX_IMAGES && (
                                    <p className="text-sm text-yellow-600 mt-2">已達到圖片數量上限 ({MAX_IMAGES} 張)。</p>
                                )}
                            </div>
                        </section>

                        <div className="flex justify-end space-x-3 pt-6">
                            <Button type="button" variant="outline" onClick={() => router.push('/products')}>
                                取消
                            </Button>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" /> 儲存變更
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )

}