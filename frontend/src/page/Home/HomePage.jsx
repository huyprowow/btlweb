import React, { useEffect } from 'react'
import NavBar from '../../component/Navbar/NavBar'
import httpBase from '../../utils/http-base'
import { useState } from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  console.log(filter)
  useEffect(() => {
    httpBase.get("/").then((res) => {
      setProducts(res.data);
      setAllTypes(res.data.map((product) => product.type));
      if (res.data.length > 0) {
        setFilter(res.data[0].type);
      }
    }).catch((err) => {
      console.log(err);
    })

  }, [])
  // console.log(products)
  // console.log(allTypes)
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  const handleFilter = (type) => {
    setFilter(type);
  }
  const handleClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="fd-page">
          <div className="banner-food-drink">
            <div className="inner">
              <div className="desc-banner">
                <div className="text">
                  <div className="t-head">Thức uống</div>
                  <div className="t-main">
                    <p></p>
                    <p><span className='text-logo'>CvStore</span> luôn "thỏa cơn khát" của bạn 24/7 với đa dạng các loại thức
                      uống từ nóng đến lạnh. Đặc biệt, bạn có thể cùng bạn bè thỏa sức sáng tạo thức
                      uống của mình bằng cách tự pha trộn và kết hợp các hương vị có sẵn.
                      <span className='text-logo'>CvStore</span> luôn có thức uống mới để bạn thưởng thức và trải nghiệm.</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-tabs-fd">
            <div className="tabs-fd">
              <div className="inner">
                <div className="slick-fd swiper-container">
                  <div className="swiper-wrapper">
                    {
                      allTypes.filter(onlyUnique).map((type, index) => {
                        // console.log(allTypes.filter(onlyUnique))
                        return (
                          <div className="item swiper-slide" onClick={() => handleFilter(type)}>
                            <a >
                              {type}
                              <span className="icon"><ion-icon name="caret-up-outline"></ion-icon></span>
                            </a>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                {/* <div className="btn-slick-wrapper">
                  <div className="btn-slick btn-next">
                    <a href="#">
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                    </a>
                  </div>
                  <div className="btn-slick btn-prev">
                    <a href="#">
                      <ion-icon name="chevron-back-outline"></ion-icon>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="wrap-products">
            {
              products.filter((product) => product.type === filter).map((product, index) => {
                return (

                  <div className="item-product" key={product._id} onClick={() => handleClick(product._id)}>
                    <div className="img-product">
                      <img src={product.image} alt="" width={"100%"} height={"100%"} />
                    </div>
                    <div className="name-product">
                      <p>{product.name}</p>
                    </div>
                  </div>
                )
              })
            }

            {/* <!-- <div className="detail show" style="overflow:hidden; display: block;">
                      <div className="inner">
                        <div className="table">
                          <div className="table-cell img">
                            <img src="./final_ex/image\/CF-sua-nong_new-logo_303x303.png" alt=""/>
                          </div>
                          <div className="table-cell info"></div>
                        </div>
                      </div>
                    </div> --> */}
          </div>
          <div className="explore-more">
            <div className="inner" >
              <div className="title-ex">KHÁM PHÁ THÊM</div>
              <div className="item one left explore-image">
                <div className="info">
                  <div className="title">
                    Sản Phẩm
                    <br />
                    &&nbsp;Dịch&nbsp;vụ
                  </div>
                  <div className="desc">
                    <p>
                      Cảm nhận sự tiện lợi và chất lượng về dịch vụ. Trải nghiệm sự phong phú về sản
                      phẩm và dịch vụ khi mua sắm tại <span className='text-logo'>CvStore</span>.
                    </p>
                  </div>
                  <div className="button-kind-2 add-on-1">
                    <a href="#">
                      KHÁM PHÁ NGAY
                      <span className="ico-1"><ion-icon name="arrow-forward-circle-outline"></ion-icon></span>
                    </a>
                  </div>
                </div>
                <img src="https://www.joneslanglasalle.com.vn/images/global/treant-and-insights/global-investor-grcoery-investment-teaser.jpg.rendition/global-investor-grcoery-investment-desktop.jpg" alt="" width={"100%"} />
              </div>
              <div className="item two right explore-image">
                <div className="info">
                  <div className="title">Tìm <span className='text-logo'>CvStore</span> gần nhất</div>
                  <div className="desc">
                    <p>
                      Với hơn 400 cửa hàng tại Tp.Hồ Chí Minh, Bình Dương, Vũng Tàu, Cần Thơ, Hạ
                      Long, Hà Nội, Hải Phòng và Long Xuyên bạn sẽ dễ dàng tìm được cửa hàng
                      <span className='text-logo'>CvStore</span> gần nhất.
                    </p>
                  </div>
                  <div className="button-kind-2 add-on-1">
                    <a href="#">
                      TÌM CỬA HÀNG
                      <span className="ico-1"><ion-icon name="arrow-forward-circle-outline"></ion-icon></span>
                    </a>
                  </div>
                </div>
                <img src="https://www.joneslanglasalle.com.vn/images/global/treant-and-insights/global-investor-grcoery-investment-teaser.jpg.rendition/global-investor-grcoery-investment-desktop.jpg" alt="" width={"100%"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default HomePage