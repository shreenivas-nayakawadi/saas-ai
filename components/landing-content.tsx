"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Aisha Khan",
    avatar: "A",
    title: "Frontend Developer",
    description: "A seamless and intuitive experience from start to finish.",
  },
  {
    name: "Carlos Martinez",
    avatar: "C",
    title: "Data Analyst",
    description: "The features and performance exceeded my expectations.",
  },
  {
    name: "Emily Zhang",
    avatar: "E",
    title: "UX Designer",
    description: "A beautiful UI backed by powerful functionality.",
  },
  {
    name: "Ravi Patel",
    avatar: "R",
    title: "DevOps Engineer",
    description: "Highly reliable and integrates perfectly into our workflow.",
  },
  {
    name: "Lena Müller",
    avatar: "L",
    title: "Product Manager",
    description: "Helped our team improve productivity significantly.",
  },
  {
    name: "Tomoko Sato",
    avatar: "T",
    title: "Backend Developer",
    description: "Robust, scalable, and easy to maintain. Highly recommend!",
  },
];


export const LandingContent = () => {
      return (
            <div className="px-10 pb-20">
                  <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                        Testimonials
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {testimonials.map((item) => (
                              <Card
                                    key={item.description}
                                    className="bg-[#192339] border-none text-white"
                              >
                                    <CardHeader>
                                          <CardTitle className="flex items-center gap-x-2">
                                                <div>
                                                      <p className="text-lg ">
                                                            {item.name}
                                                      </p>
                                                      <p className="text-zinc-400 text-sm">
                                                            {item.title}
                                                      </p>
                                                </div>
                                          </CardTitle>
                                          <CardContent className="pt-4 px-0">{item.description}</CardContent>
                                    </CardHeader>
                              </Card>
                        ))}
                  </div>
            </div>
      );
};
