// @ts-nocheck
import _404Img from "/images/404.svg";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
export default function Page404() {
    const navigate = useNavigate();
    return (
        <Stack
            alignItems={"center"}
            justifyItems={"center"}
            justifyContent={"center"}
            minHeight={"100vh"}
            gap={3}
            px={0.5}
        >
            <Typography component={"img"} src={_404Img} alt="404" width={250} />
            <Typography color={"text.secondary"}>الصفحة غير موجودة</Typography>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
                flexWrap={"wrap"}
            >
                <Link to={"/"} replace>
                    <Button variant="outlined" color="secondary">
                        الصفحة الرئيسية
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (window.history?.length && window.history.length > 1)
                            navigate(-1, { replace: true });
                        else navigate("/", { replace: true });
                    }}
                >
                    الصفحة السابقة
                </Button>
            </Stack>
        </Stack>
    );
}
