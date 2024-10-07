import { NextResponse } from 'next/server';
import dbConnect from '@/db/dbConnect';
import mongoose from 'mongoose';
import { StageSchema } from '@/db/schemas';

const Stage = mongoose.models.Stage || mongoose.model('Stage', StageSchema);

export async function GET() {
  await dbConnect();
  const stages = await Stage.find({});
  return NextResponse.json(stages);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const newStage = new Stage(body);
  await newStage.save();
  return NextResponse.json(newStage, { status: 201 });
}