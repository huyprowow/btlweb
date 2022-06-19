import { Alert, Grid, Snackbar, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import httpBase from "../../utils/http-base"
import CircleProgressCustom from "../CircleProcessCustom/CircleProgressCustom"
import CircleProgressCustom2 from "../CircleProcessCustom/CircleProgressCustom2"
import CircleProgressCustom3 from "../CircleProcessCustom/CircleProgressCustom3"
const Overview = () => {
  const [numberUser, setNumberUser] = useState()
  const [numberProduct, setNumberProduct] = useState()
  const [totalRevenue, setTotalRevenue] = useState()//coi nhu lap khach k huy, mua xong tinhs luon vao doanh thu
  // const [progress, setProgress] = useState();
  const [error, setError] = useState(null)
  const getOverview = async () => {
    httpBase.get("/overview").then((res) => {
      setNumberUser(res.data.numberUser)
      setNumberProduct(res.data.numberProduct)
      setTotalRevenue(res.data.totalRevenue)
      // console.log(numberUser)
      // console.log(res.data.numberUser)
    }).catch((err) => {
      setError(err)
    })
  }

  useEffect(() => {
    getOverview()
  }, []);
  return (
    <>
      {
        error &&
        <Snackbar open={true} >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error.map((err) => <span>{err}</span>)}
          </Alert>
        </Snackbar>
      }
      {/*
      phai xu li rieng 2 cai vi props 1 cai thay doi anh huong toi cai kia
      (:v noi chung la vi ga k biet xu li kieu j nen xu li rieng)
    */}
      <Typography variant="h4" component="h4" id="title" gutterBottom textAlign={"center"}>
        Overview
      </Typography>
      <Grid container width={"100%"} >
        <Stack direction="row" justifyContent={"space-evenly"} alignItems={"flex-end"} width={"100%"}>
          <Grid >
            <CircleProgressCustom total={numberUser} />
            <Typography variant="h6" component="h6" id="title" gutterBottom textAlign={"center"}>
              Number User
            </Typography>
          </Grid>
          <Grid>
            <CircleProgressCustom2 total={totalRevenue} />
            <Typography variant="h6" component="h6" id="title" gutterBottom textAlign={"center"}>
              Total Revenue
            </Typography>
          </Grid>
          <Grid>
            <CircleProgressCustom3 total={numberProduct} />
            <Typography variant="h6" component="h6" id="title" gutterBottom textAlign={"center"}>
              Number Product
            </Typography>
          </Grid>
        </Stack>
      </Grid>
    </>
  )
}

export default Overview