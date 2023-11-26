import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as RouteTypes from "../../lib/RouteTypes"

import Btn_Primary from "../../components/Btn_Primary"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useResetPasswordMutation } from "../../Redux/feature/API/accountApiSlice/accountApiSlice"
import { setUserJWT } from "../../lib/usetJWT_Handler"

const ChangePass = ({ UserCode, UserEmail }) => {
  const [newPassword, setNewPassword] = useState()
  const [currentPassword, setCurrentPassword] = useState()
  const [ResetPassword, { isLoading }] = useResetPasswordMutation()
  const navigate = useNavigate()
  return (
    <>
      <div className=" p-14">
        <div className="flex justify-between">
          <span
            className="inline-block cursor-pointer"
            onClick={() => {
              navigate(RouteTypes.LandingPage)
            }}>
            <AiOutlineArrowLeft className="text-3xl font-bold text-Shades" />
          </span>
          <p className=" text-2xl font-bold text-Shades">Go Back </p>
        </div>

        <form
          className="mt-20"
          onSubmit={async (e) => {
            e.preventDefault()
            let go = await ResetPassword({
              email: UserEmail,
              code: UserCode,
              password: currentPassword,
              new_password: newPassword,
            })
            if (go.status === "success") {
              await setUserJWT(go?.data?.token)
            }
          }}>
          <div className="mt-10">
            <label htmlFor="logInTwoPassCode" className=" mb-4 block text-sm font-medium text-gray-900">
              New password
            </label>
            <input
              type="password"
              id="logInTwoPassCode"
              placeholder="**********"
              className="form-input"
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </div>

          <div className="mt-10">
            <label htmlFor="NewPassCode" className=" mb-4 block text-sm font-medium text-gray-900">
              Confirm new password
            </label>
            <input
              type="password"
              id="NewPassCode"
              placeholder="**********"
              className="form-input"
              onChange={(e) => {
                setCurrentPassword(e.target.va)
              }}
            />
          </div>

          <Btn_Primary className={"mt-7 w-full pt-3"} type={"submit"}>
            {isLoading ? "Loading..." : "Change Password"}
          </Btn_Primary>
        </form>
      </div>
    </>
  )
}

export default ChangePass
