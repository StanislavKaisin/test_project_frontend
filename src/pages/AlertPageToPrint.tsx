import { Container, Grid, ImageListItem, Typography } from "@material-ui/core";
import React, { RefObject } from "react";
import QRCode from "react-qr-code";
import { BASE_URL } from "../api/api.config";
import { cutDescription } from "../helpers/cutDescription";
import { IAlertProps } from "./AlertPage";

export interface IAlertToPrintProps {
  alert: IAlertProps;
  page: string;
}

interface IshortInfo {
  title: string;
  description: string;
  name: string;
  phone: string;
  viber: string;
  qr: string;
}

export const AlertPageToPrint = React.forwardRef<
  IAlertToPrintProps,
  RefObject<HTMLDivElement>
>((props, ref) => {
  //ts-ignore
  const alert = props.hasOwnProperty("alert")
    ? (props as unknown as IAlertToPrintProps).alert
    : null;
  const fullPagePath = alert?.qr ? alert.qr : null;

  const photo = alert?.img ? `${BASE_URL}/${alert.img}` : false;
  const shortInfo: IshortInfo = {
    title: alert?.title as string,
    description: cutDescription(alert?.description!, 10),
    name: alert?.user[0].name as string,
    phone: alert?.phone as string,
    viber: alert?.viber as string,
    qr: fullPagePath as string,
  };
  const shortInfos: IshortInfo[] = [];
  shortInfos.length = 8;
  shortInfos.fill(shortInfo);
  return (
    <>
      {/* @ts-ignore */}
      <Container
        sx={{
          height: "295mm",
          width: "205mm",
          margin: "0 auto",
          padding: 0,
          border: "1px solid",
          position: "relative",
        }}
        ref={ref}
      >
        {alert ? (
          <Grid container direction="column" alignContent="center">
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              {cutDescription(alert.title, 40)}
            </Typography>
            {photo ? (
              <ImageListItem
                key={8}
                sx={{
                  margin: "0 auto",
                }}
              >
                <img
                  src={photo}
                  width="360"
                  height="250"
                  alt={alert.title}
                  loading="lazy"
                  style={{
                    height: "115mm",
                  }}
                />
              </ImageListItem>
            ) : (
              <div
                style={{
                  margin: "0 auto",
                  height: "75mm",
                  width: "50mm",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No photo
              </div>
            )}
            <Typography
              variant="h6"
              component="p"
              align="center"
              sx={{
                mt: 2,
                paddingLeft: "1rem",
                paddingRight: "1rem",
                lineHeight: "1rem",
              }}
            >
              {cutDescription(alert.description, 600)}
            </Typography>
            {fullPagePath && (
              <Grid
                item
                alignContent="center"
                sx={{
                  mt: 1,
                  mb: 1,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <QRCode value={fullPagePath} size={100} />
                </div>
              </Grid>
            )}

            <Grid container sx={{ paddingLeft: "1rem" }}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="p"
                >{`Please, call me, ${alert.user[0].name}, if you find: `}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ paddingLeft: "1rem" }} direction="row">
              <Grid item>
                <Typography variant="h6" component="p">{` Viber: `}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  component="a"
                  href={`tel:${alert.viber ? alert.viber : ""}`}
                >{`${alert.viber ? alert.viber : ""}`}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ paddingLeft: "1rem" }} direction="row">
              <Grid item>
                <Typography variant="h6" component="p">{` Phone:`}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  component="a"
                  href={`tel:${alert.phone}`}
                >{`${alert.phone}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "75mm",
            width: "100%",
            borderTop: "1px dashed",
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          {shortInfos.map((alert: IshortInfo, index: number) => {
            return (
              <div
                key={index}
                style={{
                  height: "75mm",
                  minWidth: "25mm",
                  flexBasis: "auto",
                  borderLeft: "1px solid",
                  borderRight: "1px solid",
                }}
              >
                <div
                  style={{
                    transform: "rotate(270deg) translateX(-90%)",
                    transformOrigin: "top left",
                    width: "75mm",
                    height: "25mm",
                  }}
                >
                  <Typography>{cutDescription(alert.title, 10)}</Typography>
                  <Typography>
                    {cutDescription(alert.description, 10)}
                  </Typography>
                  <Typography>{alert.name}</Typography>
                  <Typography>{alert.phone}</Typography>
                </div>
                {alert.qr && (
                  <div
                    style={{
                      textAlign: "center",
                      transform: " translateY(-100%)",
                    }}
                  >
                    <QRCode value={alert.qr} size={64} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
});
