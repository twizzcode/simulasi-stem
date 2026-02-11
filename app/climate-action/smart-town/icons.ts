export type MapIconPlacement = {
  left: string
  top: string
  sizeNormal: string
  sizeFullscreen: string
  rotateDeg?: number
}

export const getIconSizeClass = (
  isFullscreen: boolean,
  placement: MapIconPlacement,
) => {
  return isFullscreen ? placement.sizeFullscreen : placement.sizeNormal
}

export const housePlacements: MapIconPlacement[] = [
  {
    left: "24%",
    top: "60%",
    sizeNormal: "h-[132px] w-[132px]",
    sizeFullscreen: "h-[18%] w-[18%]",
  },
  {
    left: "35%",
    top: "50%",
    sizeNormal: "h-[118px] w-[118px]",
    sizeFullscreen: "h-[16%] w-[16%]",
  },
]

export const treePlacements: MapIconPlacement[] = [
  {
    left: "12%",
    top: "66%",
    sizeNormal: "h-[70px] w-[70px]",
    sizeFullscreen: "h-[12%] w-[12%]",
  },
  {
    left: "45%",
    top: "41%",
    sizeNormal: "h-[72px] w-[72px]",
    sizeFullscreen: "h-[12.5%] w-[12.5%]",
  },
  {
    left: "68%",
    top: "47%",
    sizeNormal: "h-[70px] w-[70px]",
    sizeFullscreen: "h-[12%] w-[12%]",
  },
  {
    left: "40%",
    top: "61%",
    sizeNormal: "h-[74px] w-[74px]",
    sizeFullscreen: "h-[13%] w-[13%]",
  },
  // {
  //   left: "77%",
  //   top: "62%",
  //   sizeNormal: "h-[72px] w-[72px]",
  //   sizeFullscreen: "h-[12.5%] w-[12.5%]",
  // },
  {
    left: "45%",
    top: "84%",
    sizeNormal: "h-[70px] w-[70px]",
    sizeFullscreen: "h-[12%] w-[12%]",
  },
  // {
  //   left: "84%",
  //   top: "84%",
  //   sizeNormal: "h-[70px] w-[70px]",
  //   sizeFullscreen: "h-[12%] w-[12%]",
  // },
]

export const busPlacement: MapIconPlacement = {
  left: "60%",
  top: "85%",
  sizeNormal: "h-[170px] w-[170px]",
  sizeFullscreen: "h-[30%] w-[30%]",
}

export const carbonTariffPlacements: MapIconPlacement[] = [
  {
    left: "30%",
    top: "18%",
    sizeNormal: "h-[64px] w-[64px]",
    sizeFullscreen: "h-[10.5%] w-[10.5%]",
  },
  {
    left: "38%",
    top: "20%",
    sizeNormal: "h-[58px] w-[58px]",
    sizeFullscreen: "h-[9.8%] w-[9.8%]",
  },
]

export const panganPeoplePlacements: MapIconPlacement[] = [
  {
    left: "52%",
    top: "50%",
    sizeNormal: "h-[72px] w-[72px]",
    sizeFullscreen: "h-[11%] w-[11%]",
  },
  {
    left: "60%",
    top: "50%",
    sizeNormal: "h-[68px] w-[68px]",
    sizeFullscreen: "h-[10%] w-[10%]",
  },
]

export const nuclearPlacement: MapIconPlacement = {
  left: "22%",
  top: "26%",
  sizeNormal: "h-[140px] w-[140px]",
  sizeFullscreen: "h-[22%] w-[22%]",
}

export const solarPanelPlacements: MapIconPlacement[] = [
  {
    left: "66%",
    top: "37%",
    sizeNormal: "h-[150px] w-[150px]",
    sizeFullscreen: "h-[14%] w-[14%]",
  },
  {
    left: "80%",
    top: "40%",
    sizeNormal: "h-[150px] w-[150px]",
    sizeFullscreen: "h-[14%] w-[14%]",
  },
]

export const windTurbinePlacements: MapIconPlacement[] = [
  {
    left: "60%",
    top: "25%",
    sizeNormal: "h-[132px] w-[132px]",
    sizeFullscreen: "h-[19%] w-[19%]",
  },
  {
    left: "70%",
    top: "27%",
    sizeNormal: "h-[126px] w-[126px]",
    sizeFullscreen: "h-[18%] w-[18%]",
  },
  {
    left: "82%",
    top: "27%",
    sizeNormal: "h-[122px] w-[122px]",
    sizeFullscreen: "h-[17%] w-[17%]",
  },
  {
    left: "88%",
    top: "32%",
    sizeNormal: "h-[122px] w-[122px]",
    sizeFullscreen: "h-[17%] w-[17%]",
  },
]

export const farmPlacements: MapIconPlacement[] = [
  {
    left: "85%",
    top: "60%",
    sizeNormal: "h-[54px] w-[292px]",
    sizeFullscreen: "h-[11%] w-[45%]",
    rotateDeg: 13,
  },
  {
    left: "75%",
    top: "68%",
    sizeNormal: "h-[54px] w-[292px]",
    sizeFullscreen: "h-[11%] w-[45%]",
    rotateDeg: 13,
  },
]

export const carbonCapturePlacement: MapIconPlacement = {
  left: "80%",
  top: "81%",
  sizeNormal: "h-[130px] w-[130px]",
  sizeFullscreen: "h-[18%] w-[18%]",
  rotateDeg: 0,
}

export const educationPlacement: MapIconPlacement = {
  left: "50%",
  top: "67%",
  sizeNormal: "h-[152px] w-[152px]",
  sizeFullscreen: "h-[15%] w-[15%]",
  rotateDeg: 0,
}
