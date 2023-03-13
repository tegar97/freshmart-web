import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function RecipeBox({
  cardColor,
  textColor,
  data,
}: {
        cardColor: String;
        textColor: String;
  data: any;
}) {
    return (
      <Link href={`/recipe/${data.id}`}>
        <div className="w-full   ">
        <div className={`bg-[${cardColor}] rounded-xl `}>
            <Image
            src={data.imageUrl}
            width={300}
            height={300}
            className="w-full rounded-md object-cover    h-32   "
            alt={""}
            />
            <div className="py-2 px-2   font-semibold text-center">
            <h2 className={`text-[${textColor}] `}>
            {data.name}
            </h2>
            </div>
        </div>
        </div>
      </Link>
  );
}

export default RecipeBox