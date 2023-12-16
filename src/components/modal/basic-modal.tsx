"use client";

import { TBasicSchemaType, basicSchema } from "./form-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { EFormType } from "@app/enums";
import { fetchCustom } from "@app/fetch";
import { useState } from "react";

const fields = [
  {
    label: "Your Name",
    value: "name",
  },
  {
    label: "Email",
    value: "email",
  },
] as const;

export const BasicModal = () => {
  // loading state
  const [loading, setLoading] = useState(false);

  // setup Form
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TBasicSchemaType>({ resolver: zodResolver(basicSchema) });

  // Submit Form
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    await fetchCustom("api/form", {
      method: "POST",
      data: JSON.stringify({ ...data, type: EFormType.BASIC }),
    });

    setLoading(false);

    // Close Modal
    (document.getElementById("modal--basic-modal") as HTMLFormElement).close();

    // reset form when submitted
    reset();
  });

  const onCloseModal = () => {
    clearErrors();
  };

  return (
    <dialog id="modal--basic-modal" className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Basis Subscription</h3>
          <form method="dialog">
            <button onClick={onCloseModal} className="btn btn-ghost">
              X
            </button>
          </form>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.value}>
              <div className="label">
                <span className="label-text">
                  {field.label}
                  <span className="ml-2 text-error">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className={`input input-bordered w-full ${
                  errors?.[field.value] ? "input-error" : ""
                }`}
                {...register(field.value)}
              />
              {errors?.[field.value] && (
                <p className="text-error mt-1">
                  {errors[field.value]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner"></span>}
            Subscribe
          </button>
        </form>
      </div>

      {/* Close modal when click in backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onCloseModal}>close</button>
      </form>
    </dialog>
  );
};
