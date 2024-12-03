"use client";
import SearchBar from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable";

import { Student, column } from "@/components/Columns";
import { students } from "./interfaces/student";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { ColumnFiltersState } from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateForm } from "@/components/CreateForm";
import { IoMdAdd } from "react-icons/io";
import { UpdateForm } from "@/components/UpdateForm";

// async function getStudents(): Promise<Student> {

// }

const tables: string[] = ["Students", "Posts", "Comments"];

export default function Home() {
  const [curTable, setCurTable] = useState<string>("Students");
  const [data, setData] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (curTable === "Students") {
  //       try {
  //         const response = await axios.get("api/students");
  //         const data = await response.data;
  //         console.log(data); // Use the data as needed
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     } else if (curTable === "Posts") {
  //       try {
  //         const response = await axios.get("api/posts");
  //         const data = await response.data;
  //         console.log(data); // Use the data as needed
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [curTable]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "";
        if (curTable === "Students") {
          endpoint = "api/students";
        } else if (curTable === "Posts") {
          endpoint = "api/posts";
        }
        if (endpoint) {
          const response = await axios.get(endpoint);
          const fetchedData = response.data;
          // setData(fetchedData); // Update the state with fetched data
          const combinedData =
            curTable === "Students"
              ? [...students, ...fetchedData] // Merge fake and real data
              : fetchedData;

          setData(combinedData); // Update state with combined data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [curTable]);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mr-2">
          Team "Select From" Demo
        </h4>
        <Separator orientation="vertical" className="mr-10 h-6" />
        <SearchBar />
      </header>

      <div className="container mx-auto py-10">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ml-1">
          {curTable}
        </h2>
        <div className="flex items-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-auto">
                Tables
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {tables.map((table) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={table}
                    className="capitalize"
                    checked={table == curTable}
                    onCheckedChange={() => setCurTable(table)}
                  >
                    {table}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger className="flex items-center gap-2">
              <IoMdAdd />
              Create
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Create new User</DialogTitle>
              <CreateForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="flex items-center gap-2 ml-2">
              <IoMdAdd />
              Update
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>Update new User</DialogTitle>
              <UpdateForm />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable columns={column} data={data} />
      </div>
    </>
  );
}
