import { useForm } from "react-hook-form"
import Btn_Primary from "../../../../components/Btn_Primary"
import { useLocation } from "react-router-dom"
import EncodeDate from "../../../../utils/EncodeDate"

//  react Toast
import { toast } from "react-toastify"

//  icons
import { AiFillPlusCircle } from "react-icons/ai"

// components
import { useUpdateTaskMutation } from "../../../../Redux/feature/API/taskApiSlice/taskApiSlice"
import SingleParticipant from "../../../../components/SingParticipant"

const UpdateTaskForm = () => {
  const location = useLocation()

  const {
    title = "",
    participants = [],
    startingDate = "",
    _id,
    // completed = false,
    description = "",
    // createdAt = "",
    endingDate = "",
  } = location.state

  const beginningDate = EncodeDate(startingDate)
  const EndingDate = EncodeDate(endingDate)

  //   const [participants, setParticipants] = useState([]);
  const { handleSubmit, register } = useForm()

  const [uncompletedTask, { isLoading }] = useUpdateTaskMutation()

  const formHandler = async (data) => {
    try {
      const updateTask = await uncompletedTask({
        id: _id,
        taskDetails: {
          title: data.title,
          description: data.description,
          startingDate: data.StartDate,
          endingDate: data.EndDate,
          participants: participants,
          collection: "",
        },
      })

      if (updateTask?.data?.status) {
        toast.success("Task updated  Successfully")
      } else {
        toast.error("Task updated  Failed")
      }
    } catch (error) {
      console.warn(error.message)
    }
  }

  let tempImg = "https://th.bing.com/th/id/R.677d3abf75ddc6139ac411467c792eef?rik=Lqi7AtlZe%2fFXbw&pid=ImgRaw&r=0"
  return (
    <form
      onSubmit={handleSubmit(formHandler)}
      className=" mb-20 flex h-screen flex-1 flex-col justify-between px-7 py-4">
      <div>
        <input
          type="text"
          //    daysi ui is conflicting with this  input so i have to add this style
          style={{
            outline: "none",
          }}
          placeholder="Add a title to your task "
          className=" inputHolder"
          required
          {...register("title")}
          defaultValue={title}
        />
        {/*  dates */}
        <div className=" flex items-center gap-x-2">
          <div className=" flex flex-col">
            <p>Start Date</p>
            <input
              type="date"
              name="StartDate"
              id="StartDate"
              {...register("StartDate")}
              defaultValue={beginningDate}
            />
          </div>
          <div className=" flex flex-col">
            <p>End Date</p>
            <input
              type="date"
              name="EndDate"
              id="EndDate"
              required
              {...register("EndDate")}
              defaultValue={EndingDate}
            />
          </div>
        </div>

        <div className="my-4">
          <label htmlFor="Description" className="text-blackens ">
            <p>Description</p>
          </label>
          <br />
          <textarea
            className="h-48 w-full rounded-lg border-none ring ring-Shades/10 placeholder:text-Shades"
            name="Description"
            id="Description"
            placeholder="Write a meaningfull  Description"
            {...register("description")}
            defaultValue={description}></textarea>
        </div>

        <div className="hidden w-full">
          <label htmlFor="collection" className=" text-xl font-semibold">
            Collection
          </label>
          <br />
          <input
            type="text"
            id="collection"
            className="inputHolder"
            placeholder="Type a collection name"
            {...register("collection")}
          />
        </div>

        <div>
          <p className="my-4 text-xl font-semibold text-blackens">Participants</p>
        </div>

        <div className=" flex gap-x-3">
          {participants?.length > 0 &&
            participants?.map((SingleParticipantData, index) => {
              return <SingleParticipant key={index} imgSrc={SingleParticipantData.user.avatar || tempImg} />
            })}
          <span className="into-center rounded-md border-2 border-Shades p-1 hover:cursor-pointer">
            <AiFillPlusCircle className="text-2xl text-blue-700" />
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <Btn_Primary type={"submit"}>{isLoading ? "Loading..." : "Create Task"}</Btn_Primary>
      </div>
    </form>
  )
}
export default UpdateTaskForm
