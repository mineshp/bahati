import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import type { ReactElement } from "react";
import { useState } from "react";

interface Props {
  type: "alert" | "error" | "warning" | "success";
  heading: string;
  subHeading: string;
}

interface AlertStyle {
  [key: string]: {
    className: string;
    svg: ReactElement;
  };
}

export default function Alert(prop: Props) {
  const [alertClose, setAlertClose] = useState<boolean>(true);
  const alertStyle: AlertStyle = {
    alert: {
      className: "border-indigo-500 bg-indigo-100 text-indigo-900",
      svg: (
        <InformationCircleIcon
          className="mr-4 h-6 w-6 text-indigo-500"
          aria-hidden="true"
        />
      ),
    },
    error: {
      className: "border-red-500 bg-red-100 text-red-900",
      svg: (
        <XCircleIcon className="mr-4 h-6 w-6 text-red-500" aria-hidden="true" />
      ),
    },
    warning: {
      className: "border-yellow-500 bg-yellow-100 text-yellow-900",
      svg: (
        <ExclamationCircleIcon
          className="mr-4 h-6 w-6 text-yellow-500"
          aria-hidden="true"
        />
      ),
    },
    success: {
      className: "border-teal-500 bg-teal-100 text-teal-900",
      svg: (
        <CheckCircleIcon
          className="mr-4 h-6 w-6 text-teal-500"
          aria-hidden="true"
        />
      ),
    },
  };

  function handleAlertClose() {
    setAlertClose(false);
  }

  return alertClose ? (
    <div
      className={`rounded-lg border-t-4 px-4 py-3 shadow-md ${
        alertStyle[prop.type].className
      }`}
      role="alert"
    >
      <div className="flex">
        <div className="py-1">{alertStyle[prop.type].svg}</div>
        <div>
          <p className="font-bold">{prop.heading}</p>
          <p className="text-sm">{prop.subHeading}</p>
        </div>
        <div className="ml-auto" onClick={handleAlertClose}>
          <svg
            className="h-6 w-6 fill-current text-gray-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
