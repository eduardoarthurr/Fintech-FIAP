/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller, Resolver } from "react-hook-form";

import {
  SignupFormSchema,
  signupSchema,
} from "../interfaces/usuario.interface";
import { UseMutationResult } from "@tanstack/react-query";
import { cn } from "../lib/utils";

type SignupFormProps = Omit<React.ComponentProps<typeof Card>, "onSubmit"> & {
  onSubmit: SubmitHandler<SignupFormSchema>;
  triggerSignUp: UseMutationResult<any, Error, any, unknown>;
  title: string;
  description: string;
  noCard?: boolean;
};

const SignupForm = ({
  onSubmit,
  triggerSignUp,
  description,
  noCard = true,
  title,
  ...cardProps
}: SignupFormProps) => {
  const resolver: Resolver<SignupFormSchema> = zodResolver(
    signupSchema
  ) as unknown as Resolver<SignupFormSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormSchema>({
    resolver,
    mode: "onTouched",
  });

  function formatCPF(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 9);
    const part4 = digits.slice(9, 11);
    if (!part2) return part1;
    if (!part3) return `${part1}.${part2}`;
    if (!part4) return `${part1}.${part2}.${part3}`;
    return `${part1}.${part2}.${part3}-${part4}`;
  }

  const [cpfDisplay, setCpfDisplay] = useState("");

  return (
    <Card
      {...cardProps}
      className={cn(!noCard && "border-none bg-transparent")}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Nome Completo"
                {...register("nome")}
              />
              {errors.nome && (
                <FieldDescription>{errors.nome.message}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                {...register("email")}
              />
              {errors.email && (
                <FieldDescription color="#FFCC00">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="senha">Senha</FieldLabel>
              <Input
                id="senha"
                type="password"
                placeholder="Mínimo 8 caracteres"
                {...register("senha")}
              />
              <FieldDescription>
                A senha deve ter pelo menos 8 caracteres, incluir letras e
                números.
              </FieldDescription>
              {errors.senha && (
                <FieldDescription>{errors.senha.message}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmSenha">Confirmar senha</FieldLabel>
              <Input
                id="confirmSenha"
                type="password"
                {...register("confirmSenha")}
              />
              {errors.confirmSenha && (
                <FieldDescription>
                  {errors.confirmSenha.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="cpf">CPF</FieldLabel>

              <Controller
                control={control}
                name="cpf"
                render={({ field }) => {
                  return (
                    <Input
                      id="cpf"
                      type="text"
                      inputMode="numeric"
                      placeholder="123.456.789-00"
                      maxLength={14}
                      value={
                        cpfDisplay === "" && field.value
                          ? formatCPF(String(field.value))
                          : cpfDisplay || formatCPF(String(field.value || ""))
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatCPF(e.target.value);
                        setCpfDisplay(formatted);
                        field.onChange(formatted.replace(/\D/g, ""));
                      }}
                      onBlur={() => {
                        field.onBlur();
                      }}
                      ref={field.ref}
                    />
                  );
                }}
              />

              {errors.cpf && (
                <FieldDescription>{errors.cpf.message}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="endereco">Endereço</FieldLabel>
              <Input
                id="endereco"
                type="text"
                placeholder="Rua das Palmeiras, 250 - São Paulo, SP"
                {...register("endereco")}
              />
              {errors.endereco && (
                <FieldDescription>{errors.endereco.message}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="dataNascimento">
                Data de nascimento
              </FieldLabel>
              <Input
                id="dataNascimento"
                type="date"
                {...register("dataNascimento")}
              />
              {errors.dataNascimento && (
                <FieldDescription>
                  {errors.dataNascimento.message}
                </FieldDescription>
              )}
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={triggerSignUp.isPending}>
                  {triggerSignUp.isPending ? "Aguarde" : "Criar conta"}
                </Button>

                {noCard && (
                  <FieldDescription className="px-6 text-center">
                    Já tem conta? <a href="/login">Entrar</a>
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
