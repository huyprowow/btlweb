import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../component/Navbar/NavBar";
import httpBase from "../../utils/http-base";
import "./limitscope.scss"
import "./style.css";
const ViewProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [inputAddressShow, setInputAddressShow] = useState(false);
    const [address, setAddress] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const { role, userName, email } = localStorage.getItem("userInformation") ? JSON.parse(localStorage.getItem("userInformation")) : {};
    const navigate = useNavigate();
    useEffect(() => {
        httpBase.get(`/product/${id}`).then((res) => {
            setProduct(res.data)
            httpBase.post(`/product/${id}/related`, {
                type: res.data.type
            }).then((res2) => {
                setRelatedProducts(res2.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })

    }, [id])
    console.log(relatedProducts)
    const handleClick = () => {
        setInputAddressShow(!inputAddressShow)
    }
    const handleChange = (e) => {
        switch (e.target.name) {
            case "address":
                setError("");
                setAddress(e.target.value);
                break;
            case "quantity":
                setQuantity(e.target.value);
                break;
            default:
                break;
        }
    }
    const handleRelatedClick = (id) => {
        navigate(`/product/${id}`)
    }
    const handleBuy = (e) => {
        if (address === "") {
            setError("Vui lòng nhập địa chỉ")
            return;
        }
        // e.preventDefault();
        httpBase.post("/invoice/buy", {
            userName: userName,
            email: email,
            name: product.name,
            price: product.price,
            number: product.number,
            address: address,
        }).then((res) => {
            console.log(res)
            navigate("/success")
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setInputAddressShow(false)
        })
    }
    return (
        <>
            <NavBar />
            <main className="view-product">
                {/* <!---------------------------------------Product------------------------------------------------> */}
                <section className="Product">
                    <div className="container">
                        {/* <div className="Product-top row">
                        <li>
                            <a href="">Trang chủ</a>
                        </li>
                        <span>&#62;</span>
                        <li>
                            <a href="">Thức Ăn & Thức Uống</a>
                        </li>
                        <span>&#62;</span>
                        <p>Bánh Bao</p>
                    </div> */}
                        <div className="Product-content row" style={{ paddingTop: "50px" }}>
                            <div className="product-content-left row">
                                <div className="product-content-left-big-img">
                                    <img src={product.image} alt="ảnh đồ ăn" />
                                </div>
                                {/* <div className="product-content-left-small-img">
                                    <img src="/doban/banhbao3.jpg" alt="ảnh đồ ăn" />
                                    <img src="/doban/banhbao2.jpg" alt="ảnh đồ ăn" />
                                    <img src="/doban/banhbao1.png" alt="ảnh đồ ăn" />
                                    <img src="/doban/banhbao5.webp" alt="ảnh đồ ăn" />
                                </div> */}
                            </div>
                            <div className="product-content-right">
                                <div className="product-content-right-name">
                                    <h1>{product.name}</h1>
                                </div>
                                <div className="product-content-right-price">
                                    <p>
                                        {product.price} <sup>$</sup>
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>Tình Trạng</span>: {product.status ? "Đang được bán" : "Đặt trước"}
                                    </p>
                                </div>
                                {/* <div className="product-content-right-size">
                                    <span style={{ fontWeight: "bold" }}>Size:</span>
                                    <div className="size" style={{ marginLeft: "35px" }}>
                                        <span>Nhỏ</span>
                                        <span>Vừa</span>
                                        <span>Lớn</span>
                                    </div>
                                </div> */}
                                <div className="quantity">
                                    <p style={{ fontWeight: "bold" }}>Số Lượng:</p>
                                    {
                                        product.number > 0 ?
                                            <input type="number" min="0" max={product.number} name="quantity" value={quantity} onChange={handleChange} />
                                            : <p>Hết hàng</p>
                                    }
                                </div>
                                <div className="product-content-right-button" >
                                    <button disabled={role || product.number ? false : true} onClick={handleClick}>
                                        <i className="fas fa-shopping-cart"></i>
                                        <p>Mua Ngay</p>
                                    </button>
                                </div>
                                {inputAddressShow && (
                                    <div className="product-modal">
                                        <div id="form-buy" >
                                            <i className="cancel" onClick={handleClick}>X</i>
                                            <h1 >Nhập địa chỉ nhận hàng</h1>
                                            <div className="form-control">
                                                <input type="text" className="input-address" name="address" onChange={handleChange} />
                                                <button className="btn btn-buy" onClick={handleBuy}>Buy</button>
                                            </div>
                                            {error && <p style={{ color: "red" }}>{error}</p>}
                                        </div>
                                    </div>
                                )}
                                <div className="product-content-right-bottom">
                                    <div className="product-content-right-bottom-top">&#8744;</div>
                                    <div className="product-content-right-bottom-content-big">
                                        <div className="product-content-right-bottom-content-title row">
                                            {/* <div className="product-content-right-bottom-content-title-item gioithieu">
                                                <p>Giới Thiệu</p>
                                            </div> */}
                                            <div className="product-content-right-bottom-content-title-item chitiet">
                                                <p>Chi Tiết Sản Phẩm</p>
                                            </div>
                                            {/* <div className="product-content-right-bottom-content-title-item baoquan">
                                                <p>Bảo Quản</p>
                                            </div> */}
                                        </div>
                                        <div className="product-content-right-bottom-content">
                                            {/* <div className="product-content-right-bottom-content-gioithieu">
                                                <p>
                                                    Bánh bao là một loại bánh làm bằng bột mỳ có nhân và hấp
                                                    chín, chiên hoặc nướng trước khi ăn Là món ăn thơm ngon,
                                                    đặc trưng trong ấm thực của Trung Hoa. <br />
                                                    Còn ở Việt Nam,bánh bao là một loại đồ ăn tiện lợi,và
                                                    giá thành của nó cũng rất rẻ.
                                                </p>
                                            </div> */}
                                            <div className="product-content-right-bottom-content-chitiet">
                                                {/* <p>
                                                    Hương vị:ấm nóng,thơm ngon. <br />
                                                    Nguyên liệu: bột mì ,thịt,mộc nhĩ. <br />
                                                    Hình dáng :Tròn <br />
                                                    Chế biến:Hấp <br />
                                                </p> */}
                                                {product.description}
                                            </div>
                                            {/* <div className="product-content-right-bottom-content-baoquan">
                                                <p>
                                                    Đối với bánh bao đã được hấp chín thì bạn đợi cho bánh
                                                    thật nguội, xếp bánh vào hộp thực phẩm rồi đậy kín hoặc
                                                    cho vào túi nilon, túi zip sau đó cất vào ngăn mát tủ
                                                    lạnh. Với cách này bạn có thể giữ bánh bao và dùng trong
                                                    7 - 10 ngày, khi nào muốn ăn chỉ cần lấy ra và làm nóng
                                                    lại bằng nồi hấp hoặc lò vi sóng. <br />
                                                    Ngoài ra bạn cũng có thể cho bánh bao vào ngăn đông để
                                                    bảo quản và dùng được trong khoảng 1 tháng. Khi cần dùng
                                                    thì lấy bánh bao ra ngoài, rã đông hoàn toàn rồi mới
                                                    mang đi hấp lại là có thể dùng được. <br />
                                                    Để tránh ảnh hưởng đến thời hạn bảo quản bánh bao, trước
                                                    khi cho bánh vào ngăn đông/tủ đông thì bạn chia bánh bao
                                                    ra thành những khẩu phần ăn phù hợp, như vậy khi lấy ra
                                                    rã đông bạn không cần lấy cả hộp mà chỉ việc lấy một túi
                                                    bánh vừa đủ ăn.
                                                </p>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!------------------------------Product-related------------------------------> */}
                <section className="product-related">
                    <div className="product-related-title">
                        <p>SẢN PHẨM LIÊN QUAN</p>
                    </div>
                    <div className="product-content row">
                        {
                            relatedProducts.map((product, index) => {
                                return (
                                    <div className="product-related-item" onClick={()=>handleRelatedClick(product._id)}>
                                        <img src={product.image} alt="Ảnh" />
                                        <h1>{product.name}</h1>
                                        <p>
                                            {product.price}<sup>$</sup>
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                {/* <!-------------------------------------FOOTER---------------------------> */}
                <section className="app-container">
                    <div className="receive">
                        <p>
                            hãy là người đâu tiên nhận thông tin về
                            <br />
                            ưu đãi,sản phẩm & dịch vụ mới
                        </p>
                        <input type="text" placeholder="Email" />
                        <button className="btn btn-submit">Gửi</button>
                    </div>
                </section>
                {/* <!--footer--> */}
                <div className="container">
                    <div className="footer-top">
                        <li>
                            <a href="">Giới Thiệu</a>
                        </li>
                        <li>
                            <a href="">Cơ Hội Nghề Nghiệp</a>
                        </li>
                        <li>
                            <a href="">Tin Tức & Sự Kiện</a>
                        </li>
                        <li>
                            <a href="">Liên Hệ</a>
                        </li>
                        <li>
                            <a href="">Điều Khoản Sử Dụng</a>
                        </li>
                        <li>
                            <a href="">Chính Sách Bảo Mật</a>
                        </li>
                        <li>
                            <a href="">Hóa Đơn Đỏ</a>
                        </li>
                        <li>
                            <a href="" className="fa fa-facebook-square"></a>
                            <a href="" className="fa fa-youtube"></a>
                        </li>
                    </div>
                    <hr />
                    {/* <!--------------------------------footer under---------------------------->  */}

                    <div className="row footer-row">
                        <div className="col-md-8 col-12">
                            <h5>
                                <strong>
                                    CvStore Vietnam- Chuỗi cửa hàng tiện lợi- Mở cửa 24/7
                                </strong>
                            </h5>
                            <p>
                                copyright &copy;2016 CvStore Vietnam <br />
                                tel:0969969669 <br />
                                Email:playbnskorean1&#64;gmail.com
                            </p>
                            {/* <li>
                                <a href="">
                                    <img src="/doban/DUN.png" height="60px" width="75px" />
                                </a>
                            </li> */}
                        </div>
                        <div className="col-md-4 col-12">
                            <p>
                                CÔNG TY TNHH Convinient Store - Giấy CNĐKDN :6969696969 <br />
                                Ngày cấp : 30/2/2077. Nơi cấp : Sở Kế Hoạch - Đầu Tư Tp. Hà Nội
                                <br />
                                <strong>Địa chỉ :</strong>  Việt Nam.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ViewProductPage;
