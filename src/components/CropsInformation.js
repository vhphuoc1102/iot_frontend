import { useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const CardInfo = ({ name, detail }) => {
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Thông tin cơ bản" />
        <Divider />
        <CardContent>
          <Typography variant="h7" component="div" gutterBottom>
            Tên: {name}
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Địa điểm: {detail}
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian: 3 ngày
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardMonitor = () => {
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Thông tin giám sát" />
        <Divider />
        <CardContent>
          <Typography variant="h7" component="div" gutterBottom>
            Nhiệt độ: 25 - 30
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Độ ẩm: 30 - 40
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian mùa vụ: 3 ngày
          </Typography>
          <Typography variant="h7" component="div" gutterBottom>
            Thời gian chiếu sáng: 10h
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
const CardDashboard = ({ name }) => {
  const [data, setData] = React.useState(null);
  const [deviceStatus, setDeviceStatus] = React.useState({
    light: 0,
    pump: 0,
    mode: 0,
  });
  const [apiCalled, setApiCalled] = React.useState(false);
  const { token } = useAuth();
  const getRealTime = async () => {
    await fetch("http://localhost:8000/v0/get_real_time", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDevice = async () => {
    await fetch("http://localhost:8000/v0/get_device_status", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeviceStatus(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setLight = async (mode) =>
    await fetch("http://localhost:8000/v0/set_light", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        mode: mode,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setPump = async (mode) =>
    await fetch("http://localhost:8000/v0/set_pump", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        mode: mode,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setManual = async () =>
    await fetch("http://localhost:8000/v0/set_manual", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  const setAuto = async () =>
    await fetch("http://localhost:8000/v0/set_auto", {
      method: "POST",
      body: JSON.stringify({
        crop: name,
        token: token,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiCalled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  // React.useEffect(() => {
  //   if (deviceStatus !== null && !apiCalled) {
  //     setLight(deviceStatus.light);
  //     setPump(deviceStatus.pump);
  //     if (deviceStatus.mode === 0) setAuto();
  //     else setManual();
  //   }
  // }, [deviceStatus, apiCalled]);

  React.useEffect(() => {
    // Call the function for the first time
    getRealTime();
    getDevice();

    // Then set up the interval to call the function every 100 seconds
    const interval = setInterval(getRealTime, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    console.log("test1    ");
    console.log(deviceStatus);
    if (apiCalled) {
      console.log("test2");
      setLight(deviceStatus.light);
      setPump(deviceStatus.pump);
      if (deviceStatus.mode === 0) setAuto();
      else setManual();
    }
  }, [deviceStatus]);
  const handleSwitchLight = () => {
    setDeviceStatus({
      ...deviceStatus,
      light: deviceStatus.light === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  const handleSwitchPump = () => {
    setDeviceStatus({
      ...deviceStatus,
      pump: deviceStatus.pump === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  const handleSwitchMode = () => {
    setDeviceStatus({
      ...deviceStatus,
      mode: deviceStatus.mode === 1 ? 0 : 1,
    });
    setApiCalled(true);
  };
  return (
    <Card variant="outlined">
      <React.Fragment>
        <CardHeader title="Bảng điều khiển" action="" />
        <Divider />

        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={!(deviceStatus && deviceStatus.mode === 0)}
                  onChange={() => {
                    handleSwitchMode();
                  }}
                />
              }
              label="Chế độ tự động"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={deviceStatus && deviceStatus.pump === 1}
                  onChange={() => {
                    // console.log(deviceStatus.pump);
                    handleSwitchPump();
                  }}
                  disabled={deviceStatus && deviceStatus.mode === 0}
                />
              }
              label="Máy bơm nước"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={deviceStatus && deviceStatus.light === 1}
                  onChange={() => {
                    // console.log(deviceStatus.pump);
                    handleSwitchLight();
                  }}
                  // disabled={deviceStatus && deviceStatus.mode === 0}
                />
              }
              label="Đèn"
            />
          </FormGroup>
          <Typography gutterBottom></Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Nhiệt độ:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.temperature}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Độ ẩm:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.humidity}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Độ ẩm đất:
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            {data && data.result.soil}
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Thời gian mùa vụ:
          </Typography>
          <Typography
            variant="h7"
            component="div"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Thời gian chiếu sáng: {data && data.result.illuminated_time}
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};
export default function CropsInformation() {
  const { state } = useLocation();
  const { item } = state;
  return (
    <Stack spacing={2} sx={{ minWidth: 800 }}>
      <div></div>
      <CardInfo name={`${item.name}`} detail={`${item.detail}`} />
      <CardMonitor />
      <CardDashboard name={`${item.name}`} />
    </Stack>
  );
}
