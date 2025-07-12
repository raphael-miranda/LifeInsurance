import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

interface FormValues {
  age: string;
  income: string;
  dependents: string;
  riskTolerance: string;
}

interface RecommendationResponse {
  recommendation: string;
  explanation: string;
}

const validationSchema = Yup.object({
  age: Yup.number()
    .required("Age is required")
    .min(18, "Age must be at least 18")
    .max(100, "Age must be at most 100"),
  income: Yup.number()
    .required("Income is required")
    .min(0, "Income cannot be negative"),
  dependents: Yup.number()
    .required("Number of dependents is required")
    .min(0, "Number of dependents cannot be negative")
    .integer("Number of dependents must be an integer"),
  riskTolerance: Yup.string()
    .required("Risk tolerance is required")
    .oneOf(["Low", "Medium", "High"], "Invalid risk tolerance"),
});

export default function Home() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues: FormValues = {
    age: "",
    income: "",
    dependents: "",
    riskTolerance: "Medium",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setServerError(null);
    setRecommendation(null);
    setExplanation(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(values.age),
          income: parseFloat(values.income),
          dependents: parseInt(values.dependents),
          riskTolerance: values.riskTolerance,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data: RecommendationResponse = await response.json();
      setRecommendation(data.recommendation);
      setExplanation(data.explanation);
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Life Insurance Recommendation
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="age"
                className="block mb-1 font-medium text-gray-700"
              >
                Age
              </label>
              <Field
                type="number"
                name="age"
                className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your age"
              />
              <ErrorMessage
                name="age"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="income"
                className="block mb-1 font-medium text-gray-700"
              >
                Annual Income ($)
              </label>
              <Field
                type="number"
                name="income"
                step="0.01"
                className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your annual income"
              />
              <ErrorMessage
                name="income"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="dependents"
                className="block mb-1 font-medium text-gray-700"
              >
                Number of Dependents
              </label>
              <Field
                type="number"
                name="dependents"
                className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter number of dependents"
              />
              <ErrorMessage
                name="dependents"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="riskTolerance"
                className="block mb-1 font-medium text-gray-700"
              >
                Risk Tolerance
              </label>
              <Field
                as="select"
                name="riskTolerance"
                className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Field>
              <ErrorMessage
                name="riskTolerance"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? "Loading..." : "Get Recommendation"}
            </button>
          </Form>
        )}
      </Formik>
      {serverError && (
        <p className="text-red-500 mt-4 text-center">{serverError}</p>
      )}
      {recommendation && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Recommendation</h2>
          <p className="mt-2 text-gray-700">{recommendation}</p>
          <p className="mt-2 text-gray-600">{explanation}</p>
        </div>
      )}
    </div>
  );
}
