"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Button from "./Button";
import HeroStats from "./HeroStats";
import SplitText from "./SplitText";

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

const handleAnimationComplete = () => {
	// Animation completed callback.
};

export default function Hero() {
	return (
		<section id="home" className="relative scroll-mt-28 pt-24 pb-16 md:pt-28 md:pb-20">
			<div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
				<motion.div
					variants={fadeUp}
					initial="hidden"
					animate="show"
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="max-w-2xl space-y-5 lg:max-w-xl"
				>
					<SplitText
						text="Welcome to My Personal Website"
						tag="h1"
						className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl"
						delay={40}
						duration={1}
						ease="power3.out"
						splitType="chars"
						from={{ opacity: 0, y: 24 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.15}
						rootMargin="-80px"
						textAlign="left"
						onLetterAnimationComplete={handleAnimationComplete}
					/>
					<p className="max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
						Hi, I&apos;m Sellyjuan. I build modern and responsive interfaces with a strong focus on clarity,
						usability, and visual balance. Explore my projects and feel free to connect.
					</p>

					<div className="flex flex-wrap gap-3">
						<Button href="#projects">
							View Projects <ArrowRight className="ml-2" size={16} />
						</Button>
						<Button href="/cv-sellyjuanalyarosalina.pdf" variant="secondary" download>
							Download CV <Download className="ml-2" size={16} />
						</Button>
						<Button href="#contact" variant="ghost">
							Contact <Mail className="ml-2" size={16} />
						</Button>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.94, y: 24 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
					className="relative mx-auto w-full max-w-xl lg:justify-self-end"
				>
					<div className="relative aspect-4/5 min-h-100 w-full overflow-hidden bg-transparent lg:min-h-125">
						<Image
							src="/images/sellyjuan.png"
							alt="Portrait of SellyJuan"
							fill
							priority
							unoptimized
							className="object-contain object-top -translate-y-8 sm:-translate-y-6 lg:-translate-y-6"
						/>
					</div>
				</motion.div>
			</div>

			<div className="relative z-20 -mt-32 sm:-mt-36 md:-mt-40 lg:-mt-42">
				<HeroStats />
			</div>
		</section>
	);
}
