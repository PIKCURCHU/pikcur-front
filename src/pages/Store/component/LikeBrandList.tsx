import PaginationButtons from "../../../components/common/PaginationButtons";
import React
, { useEffect,
useState } from "react";
import BrandItem from "./BrandItem";
import { api } from "../../../common/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface BrandItemProps {
    brandId: number;
    brandName: string;
    brandProfile: string;
    liked:boolean;
}

const LikeBrandList: React.FC<{storeId: number}> = ({storeId}) => {
    const isAuth = useAuth();
    const navigate = useNavigate();

    const [likeBrandList, setLikeBrandList] = useState<BrandItemProps[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (!storeId) return;
        api.get(`/store/${storeId}/brand-likes`, {
            currentPage
        })
            .then((res) => {
                console.log(res);
                setLikeBrandList(res.brandLikeList);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);

    const handlerBrandSelect = (brandId: number) => {
        navigate("/brandDetail", {state:{brandId}});
    };
    const updateLikeState = (targetId: number, status: boolean) => {
        setLikeBrandList((prevList) =>
            prevList.map((item) =>
                item.brandId === targetId
                    ? { ...item, liked: status }
                    : item
            )
        );
    };
    
    const handlerLike = (brandId: number) => {
        if(isAuth) {
            api.post(`/brand/${brandId}/like`)
            .then(() => {
                // ⭐ [수정] API 요청 성공 시에만 상태 업데이트
                updateLikeState(brandId, true);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
        
    };
    
    const handlerUnlike = (brandId: number) => {
        if(isAuth) {
            api.delete(`/brand/${brandId}/like`)
            .then(() => {
                // ⭐ [수정] API 요청 성공 시에만 상태 업데이트
                updateLikeState(brandId, false);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    return (
        <div style={{
            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
        }}>
        {likeBrandList.map((brand, index)=>{
            return (
                <BrandItem
                    brand={brand}
                    onClick={()=>{handlerBrandSelect(brand.brandId)}}
                    onLike={()=>{handlerLike(brand.brandId)}}
                    onUnlike={()=>{handlerUnlike(brand.brandId)}}
                    ></BrandItem>
            );
        })}
        <PaginationButtons
            maxPage={totalPages} 
            page={currentPage} 
            onChange={handlePageChange}></PaginationButtons>
    </div>
    );
}

export default LikeBrandList;