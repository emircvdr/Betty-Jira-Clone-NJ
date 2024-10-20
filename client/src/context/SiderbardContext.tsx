"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
    workplaces: any[];
    username: string | null;
    membersWorkplaces?: any[];
    allWorkplaces: any[];
    workplacesInvites?: any[];
    setWorkplaces: (workspaces: any[]) => void;
    setUsername: (username: string) => void;
    setMembersWorkplaces?: (workplaces: any[]) => void;
    setAllWorkplaces: (workplaces: any[]) => void;
    setWorkplaceInvites?: (workplaces: any[]) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [workplaces, setWorkplaces] = useState<any[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [membersWorkplaces, setMembersWorkplaces] = useState<any[] | null>(null);
    const [allWorkplaces, setAllWorkplaces] = useState<any[]>([]);
    const [workplacesInvites, setWorkplaceInvites] = useState<any[] | null>(null);

    return (
        <SidebarContext.Provider value={{ workplaces, username, membersWorkplaces, allWorkplaces, workplacesInvites, setWorkplaces, setUsername, setMembersWorkplaces, setAllWorkplaces, setWorkplaceInvites }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebarContext must be used within a SidebarProvider");
    }
    return context;
};
