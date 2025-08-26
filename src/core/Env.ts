import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z
		.string()
		.min(1)
		.default("postgresql://my-portfolio:my-portfolio@localhost:5638/my-portfolio"),
	NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().min(1),
	NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: z.string().min(1),
	NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().min(1)
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	throw new Error(Env.error.issues[0].message);
} else {
	console.log("/*** Env loaded successfully ***/");
}

type EnvType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
