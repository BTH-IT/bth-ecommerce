import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: String,
    imageUrlList: [String],
    warranteeYear: Number,
    originPrice: Number,
    salePercent: Number,
    description: String,
    brand: String,
    generateCpu: String,
    cpu: String,
    seriesCpu: String,
    chip: String,
    ramName: String,
    ramSize: Number,
    screen: String,
    storageName: String,
    storageSize: Number,
    storagePortName: String,
    storagePortNum: Number,
    storagePortMaximum: Number,
    supportM2slotType: String,
    screenOutputPortName: String,
    screenOutputPortNum: Number,
    bluetooth: String,
    keyboard: String,
    operationSystem: String,
    size: String,
    pin: Number,
    weight: Number,
    seriesLaptop: String,
    partNumber: String,
    color: String,
    accessoriesIncluded: String,
    led: Boolean,
    touchScreen: Boolean,
    soldNum: Number
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

export { ProductSchema };
