import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { TypeormInstrumentation } from "opentelemetry-instrumentation-typeorm";

const options = {
  url: process.env.OTEL_COLLECTOR_URL || "http://localhost:4317",
  compression: CompressionAlgorithm.GZIP,
};

const metricExporter = new OTLPMetricExporter(options);
const traceExporter = new OTLPTraceExporter(options);
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 30000,
  exportTimeoutMillis: 30000,
});

const sdk = new NodeSDK({
  metricReader,
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({}),
    new TypeormInstrumentation({}),
  ],
});

process.on("beforeExit", async () => {
  await sdk.shutdown();
});

sdk.start();

export {};
