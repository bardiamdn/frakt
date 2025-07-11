"use client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../../../components/ui/card";
import { NewInvocie } from "./new-invoice";
import { fetchInvoiceSummary } from "@/lib/queries/invoices";

export default function InvoiceSummary() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["invoiceSummary"],
    queryFn: fetchInvoiceSummary,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (error) return <div>Error loading summary</div>;

  return (
    <div className="flex flex-col gap-4 px-[50px] py-[50px]">
      <div>
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">
            View, edit or delete your receipts.
          </span>
          <NewInvocie />
        </div>
      </div>
      <div className="flex md:flex-row flex-col lg:gap-[40px] gap-[20px] md:h-[150px] h-auto">
        <Card className="w-full h-full flex flex-row">
          <CardContent className="w-full flex ">
            <div className="mr-[20px] border border-orange-border p-[5px] rounded-full h-full aspect-square">
              <div className="bg-orange-background rounded-full h-full flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7227 15.0707C20.9849 15.8285 21.8119 16.2303 22.5697 15.968C23.3275 15.7058 23.7293 14.8789 23.467 14.121L20.7227 15.0707ZM19.7426 12.8212L19.8064 11.3706C19.7852 11.3697 19.7639 11.3692 19.7426 11.3692V12.8212ZM16.2578 18.1452V19.5972V18.1452ZM19.7426 23.4692V24.9212V23.4692ZM16.2578 23.4692L16.194 24.9198C16.2153 24.9207 16.2366 24.9212 16.2578 24.9212V23.4692ZM15.2778 21.2197C15.0155 20.4619 14.1886 20.0601 13.4308 20.3223C12.6729 20.5846 12.2712 21.4115 12.5334 22.1693L15.2778 21.2197ZM19.4522 10.1592C19.4522 9.35727 18.8022 8.70719 18.0002 8.70719C17.1983 8.70719 16.5482 9.35727 16.5482 10.1592H19.4522ZM16.5482 12.8212C16.5482 13.6231 17.1983 14.2732 18.0002 14.2732C18.8022 14.2732 19.4522 13.6231 19.4522 12.8212H16.5482ZM19.4522 23.4692C19.4522 22.6673 18.8022 22.0172 18.0002 22.0172C17.1983 22.0172 16.5482 22.6673 16.5482 23.4692H19.4522ZM16.5482 26.1312C16.5482 26.9331 17.1983 27.5832 18.0002 27.5832C18.8022 27.5832 19.4522 26.9331 19.4522 26.1312H16.5482ZM22.0949 14.5959L23.467 14.121C23.2003 13.3503 22.7118 12.6742 22.0601 12.1825L21.1856 13.3416L20.3111 14.5008C20.4977 14.6416 20.6426 14.8391 20.7227 15.0707L22.0949 14.5959ZM21.1856 13.3416L22.0601 12.1825C21.408 11.6906 20.6232 11.4065 19.8064 11.3706L19.7426 12.8212L19.6788 14.2718C19.9045 14.2817 20.1247 14.3602 20.3111 14.5008L21.1856 13.3416ZM19.7426 12.8212V11.3692H16.2578V12.8212V14.2732H19.7426V12.8212ZM16.2578 12.8212V11.3692C15.1709 11.3692 14.134 11.8092 13.3736 12.5836L14.4097 13.6009L15.4458 14.6181C15.6658 14.3941 15.9584 14.2732 16.2578 14.2732V12.8212ZM14.4097 13.6009L13.3736 12.5836C12.6142 13.3571 12.1922 14.4006 12.1922 15.4832H13.6442H15.0962C15.0962 15.1538 15.225 14.8431 15.4458 14.6181L14.4097 13.6009ZM13.6442 15.4832H12.1922C12.1922 16.5658 12.6142 17.6093 13.3736 18.3828L14.4097 17.3655L15.4458 16.3483C15.225 16.1233 15.0962 15.8126 15.0962 15.4832H13.6442ZM14.4097 17.3655L13.3736 18.3828C14.134 19.1572 15.1709 19.5972 16.2578 19.5972V18.1452V16.6932C15.9584 16.6932 15.6658 16.5723 15.4458 16.3483L14.4097 17.3655ZM16.2578 18.1452V19.5972H19.7426V18.1452V16.6932H16.2578V18.1452ZM19.7426 18.1452V19.5972C20.042 19.5972 20.3347 19.7181 20.5546 19.9421L21.5907 18.9249L22.6268 17.9076C21.8665 17.1332 20.8296 16.6932 19.7426 16.6932V18.1452ZM21.5907 18.9249L20.5546 19.9421C20.7755 20.1671 20.9042 20.4778 20.9042 20.8072H22.3562H23.8082C23.8082 19.7246 23.3862 18.6811 22.6268 17.9076L21.5907 18.9249ZM22.3562 20.8072H20.9042C20.9042 21.1366 20.7755 21.4473 20.5546 21.6722L21.5907 22.6895L22.6268 23.7068C23.3862 22.9333 23.8082 21.8898 23.8082 20.8072H22.3562ZM21.5907 22.6895L20.5546 21.6722C20.3347 21.8963 20.042 22.0172 19.7426 22.0172V23.4692V24.9212C20.8296 24.9212 21.8665 24.4811 22.6268 23.7068L21.5907 22.6895ZM19.7426 23.4692V22.0172H16.2578V23.4692V24.9212H19.7426V23.4692ZM16.2578 23.4692L16.3216 22.0186C16.096 22.0087 15.8757 21.9302 15.6894 21.7896L14.8149 22.9487L13.9404 24.1078C14.5925 24.5998 15.3773 24.8839 16.194 24.9198L16.2578 23.4692ZM14.8149 22.9487L15.6894 21.7896C15.5027 21.6488 15.3579 21.4512 15.2778 21.2197L13.9056 21.6945L12.5334 22.1693C12.8001 22.9401 13.2886 23.6161 13.9404 24.1078L14.8149 22.9487ZM18.0002 10.1592H16.5482V12.8212H18.0002H19.4522V10.1592H18.0002ZM18.0002 23.4692H16.5482V26.1312H18.0002H19.4522V23.4692H18.0002ZM31.9394 18H30.4874C30.4874 24.8965 24.8967 30.4872 18.0002 30.4872V31.9392V33.3912C26.5006 33.3912 33.3914 26.5003 33.3914 18H31.9394ZM18.0002 31.9392V30.4872C11.1037 30.4872 5.51304 24.8965 5.51304 18H4.06104H2.60904C2.60904 26.5003 9.49991 33.3912 18.0002 33.3912V31.9392ZM4.06104 18H5.51304C5.51304 11.1035 11.1037 5.51279 18.0002 5.51279V4.06079V2.60879C9.49991 2.60879 2.60904 9.49967 2.60904 18H4.06104ZM18.0002 4.06079V5.51279C24.8967 5.51279 30.4874 11.1035 30.4874 18H31.9394H33.3914C33.3914 9.49967 26.5006 2.60879 18.0002 2.60879V4.06079Z"
                    fill="#E4991B"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between items-center ">
              <div className="text-sm text-sidebar-foreground-muted flex items-center gap-[5px] w-full">
                <span>Total Outstanding This Month</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66659 6.5L6.66659 8.804M6.66659 4.79225V4.772M2.05859 6.5C2.05859 3.95507 4.12167 1.892 6.66659 1.892C9.21152 1.892 11.2746 3.95507 11.2746 6.5C11.2746 9.04493 9.21152 11.108 6.66659 11.108C4.12167 11.108 2.05859 9.04493 2.05859 6.5Z"
                    stroke="#A3A3A3"
                    strokeWidth="1.024"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-medium mb-[10px]">
                ${isLoading ? " --" : data.totalOutstanding}
              </h2>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-full flex flex-row">
          <CardContent className="w-full flex ">
            <div className="mr-[20px] border border-red-border p-[5px] rounded-full h-full aspect-square">
              <div className="bg-red-background rounded-full h-full flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.501 22.6445C24.2618 22.8981 25.0841 22.4869 25.3377 21.7261C25.5913 20.9654 25.1801 20.1431 24.4194 19.8895L23.501 22.6445ZM19.0597 19.6335H17.6077C17.6077 20.2585 18.0076 20.8133 18.6005 21.011L19.0597 19.6335ZM20.5117 12.8031C20.5117 12.0012 19.8616 11.3511 19.0597 11.3511C18.2578 11.3511 17.6077 12.0012 17.6077 12.8031H20.5117ZM23.9602 21.267L24.4194 19.8895L19.5189 18.256L19.0597 19.6335L18.6005 21.011L23.501 22.6445L23.9602 21.267ZM19.0597 19.6335H20.5117V12.8031H19.0597H17.6077V19.6335H19.0597ZM32.1277 18H30.6757C30.6757 24.4153 25.475 29.616 19.0597 29.616V31.068V32.52C27.0789 32.52 33.5797 26.0192 33.5797 18H32.1277ZM19.0597 31.068V29.616C12.6444 29.616 7.4437 24.4153 7.4437 18H5.9917H4.5397C4.5397 26.0192 11.0405 32.52 19.0597 32.52V31.068ZM5.9917 18H7.4437C7.4437 11.5846 12.6444 6.38398 19.0597 6.38398V4.93198V3.47998C11.0405 3.47998 4.5397 9.9808 4.5397 18H5.9917ZM19.0597 4.93198V6.38398C25.475 6.38398 30.6757 11.5846 30.6757 18H32.1277H33.5797C33.5797 9.9808 27.0789 3.47998 19.0597 3.47998V4.93198Z"
                    fill="#D12953"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between items-center ">
              <div className="text-sm text-sidebar-foreground-muted flex items-center gap-[5px] w-full">
                <span>Total Overdue This Month</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66659 6.5L6.66659 8.804M6.66659 4.79225V4.772M2.05859 6.5C2.05859 3.95507 4.12167 1.892 6.66659 1.892C9.21152 1.892 11.2746 3.95507 11.2746 6.5C11.2746 9.04493 9.21152 11.108 6.66659 11.108C4.12167 11.108 2.05859 9.04493 2.05859 6.5Z"
                    stroke="#A3A3A3"
                    strokeWidth="1.024"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-medium mb-[10px]">
                ${isLoading ? " --" : data.totalOverdue}
              </h2>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full h-full flex flex-row">
          <CardContent className="w-full flex ">
            <div className="mr-[20px] border border-green-border p-[5px] rounded-full h-full aspect-square">
              <div className="bg-green-background rounded-full h-full flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.7346 18C30.7346 25.2172 24.8839 31.068 17.6666 31.068C10.4494 31.068 4.59863 25.2172 4.59863 18C4.59863 10.7827 10.4494 4.93198 17.6666 4.93198C19.7169 4.93198 21.657 5.40415 23.3839 6.24569M28.2844 9.83248L16.8499 21.267L13.5829 18"
                    stroke="#14804A"
                    strokeWidth="2.904"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between items-center ">
              <div className="text-sm text-sidebar-foreground-muted flex items-center gap-[5px] w-full">
                <span>Total Paid This Month</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66659 6.5L6.66659 8.804M6.66659 4.79225V4.772M2.05859 6.5C2.05859 3.95507 4.12167 1.892 6.66659 1.892C9.21152 1.892 11.2746 3.95507 11.2746 6.5C11.2746 9.04493 9.21152 11.108 6.66659 11.108C4.12167 11.108 2.05859 9.04493 2.05859 6.5Z"
                    stroke="#A3A3A3"
                    strokeWidth="1.024"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-medium mb-[10px]">
                ${isLoading ? " --" : data.totalPaidThisMonth}
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
