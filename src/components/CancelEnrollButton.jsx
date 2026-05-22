"use client";

import { Button, Modal, ModalBackdrop, ModalContainer, ModalDialog, ModalHeader, ModalBody, ModalFooter, useOverlayState } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Trash2, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const CancelEnrollButton = ({ bookingId, onCancelSuccess }) => {
  const state = useOverlayState();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${bookingId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to cancel booking");
        return;
      }

      toast.success("Successfully cancelled your booking session");
      state.close();

      if (onCancelSuccess) {
        onCancelSuccess(bookingId);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel session booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        color="danger"
        variant="flat"
        className="font-bold flex items-center gap-1 hover:bg-red-500 hover:text-white transition-all duration-300"
        onPress={state.open}
      >
        <Trash2 className="w-4 h-4" /> Cancel
      </Button>

      {/* Confirmation Modal */}
      <Modal state={state}>
        <ModalBackdrop isDismissable />
        <ModalContainer className="dark:bg-[#0F172A] border dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-3xl max-w-md mx-4">
          <ModalDialog>
            {({ close }) => (
              <>
                <ModalHeader className="flex items-center gap-2 text-xl font-black border-b border-slate-100 dark:border-slate-800 text-red-500">
                  <AlertTriangle className="w-5 h-5" /> Cancel Booked Session
                </ModalHeader>

                <ModalBody className="py-6 space-y-2">
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Are you absolutely sure you want to cancel this booking?
                  </p>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                    This action will change the booking status to &quot;cancelled&quot; in the database and free up clinical slots. This cannot be undone.
                  </p>
                </ModalBody>

                <ModalFooter className="border-t border-slate-100 dark:border-slate-800 gap-3">
                  <Button
                    variant="flat"
                    onPress={close}
                    className="font-bold"
                  >
                    No, Keep It
                  </Button>
                  <Button
                    color="danger"
                    isDisabled={loading}
                    onPress={handleCancel}
                    className="font-bold text-white bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Cancelling..." : "Yes, Cancel Session"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalDialog>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default CancelEnrollButton;