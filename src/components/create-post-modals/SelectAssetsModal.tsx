import Image from 'next/image'
import React, { useRef } from 'react'

type SelectAssetsModalProps = {
  uploadedAsset?: string
  setUploadedAsset: (value: string) => void
  uploadAsset: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SelectAssetsModal: React.FC<SelectAssetsModalProps> = ({
  uploadedAsset,
  setUploadedAsset,
  uploadAsset,
}) => {
  const selectAssetRef = useRef<HTMLInputElement>(null)
  return uploadedAsset ? (
    <div className="flex flex-col items-center justify-center space-y-3 py-3">
      <div className="relative h-[50%] w-[50%]">
        {/* <Image src={uploadedAsset} layout="fill" objectFit="contain" /> */}
        <img src={uploadedAsset} />
      </div>

      <button
        onClick={() => setUploadedAsset('')}
        className="rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Remove Asset
      </button>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <button
        onClick={() => selectAssetRef.current?.click()}
        className="rounded-full bg-btn px-4 py-2 font-bold text-white hover:bg-cta"
      >
        Upload Asset
      </button>
      <input ref={selectAssetRef} type="file" hidden onChange={uploadAsset} />
    </div>
  )
}
export default SelectAssetsModal
